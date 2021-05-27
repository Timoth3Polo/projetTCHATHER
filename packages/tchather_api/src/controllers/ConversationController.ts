import { User } from ".prisma/client";
import { conversationCreateSchema } from "@tchather/common";
import {
  Authorized,
  BadRequestError,
  Body,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  NotFoundError,
  Param,
  Put,
  UnauthorizedError,
} from "routing-controllers";
import { prismaClient } from "../utils/prismaClient";
import { Asserts } from "yup";

@JsonController("/conversations")
@Authorized()
export class ConversationsController {
  @Put("/")
  async putConversation(
    @Body() conversationData: Asserts<typeof conversationCreateSchema>,
    @CurrentUser() currentUser: User
  ) {
    try {
      await conversationCreateSchema.validate(conversationData, {
        abortEarly: false,
        stripUnknown: true,
      });
    } catch (error) {
      throw new BadRequestError(error);
    }
    const conversationUsersIds = [
      ...conversationData.conversationUsers,
      currentUser.userId,
    ];

    const newConversation = await prismaClient.conversation.create({
      data: {
        conversationName: conversationData.conversationName,
        conversationType:
          conversationData.conversationUsers.length === 1
            ? "ONE_TO_ONE"
            : "GROUP",
        conversationUsers: {
          connect: conversationUsersIds.map((conversationUserId) => ({
            userId: conversationUserId,
          })),
        },
        conversationUserOwner: {
          connect: {
            userId: currentUser.userId,
          },
        },
      },
      //Selectionner les champs que l'on veut retourner
      select: {
        conversationId: true,
        conversationMessages: true,
        conversationName: true,
        conversationType: true,
        conversationUsers: true,
      },
    });

    return newConversation;
  }
  @Get("/:conversationId")
  async getConversation(
    @Param("conversationId") conversationId: string,
    @CurrentUser() currentUser: User
  ) {
    const conversation = await prismaClient.conversation.findUnique({
      where: {
        conversationId,
      },
      include: {
        conversationUsers: true,
        conversationMessages: true,
      },
    });

    if (!conversation) {
      throw new NotFoundError("Cette conversation n'existe pas ou plus.");
    }

    const isUserInConversation = conversation.conversationUsers.find(
      (conversationUser) => conversationUser.userId === currentUser.userId
    );

    if (!isUserInConversation) {
      throw new UnauthorizedError(
        "Vous n'avez pas accès à cette conversation."
      );
    }

    return conversation;
  }

  @Delete("/:conversationId")
  async deleteConversation(
    @Param("conversationId") conversationId: string,
    @CurrentUser() currentUser: User
  ) {
    const conversation = await prismaClient.conversation.findUnique({
      where: {
        conversationId,
      },
      include: {
        conversationUserOwner: true,
        conversationMessages: true,
        conversationUsers: true,
      },
    });

    if (!conversation) {
      throw new NotFoundError("Cette conversation n'existe pas ou plus.");
    }

    const isUserConversationOwner =
      currentUser.userId === conversation.conversationUserOwner.userId;

    if (!isUserConversationOwner) {
      throw new UnauthorizedError(
        "Vous n'avez pas accès à cette conversation."
      );
    }

    await prismaClient.conversation.update({
      data: {
        conversationMessages: {
          disconnect: conversation.conversationMessages.map(
            (conversationMessage) => ({
              messageId: conversationMessage.messageId,
            })
          ),
        },
        conversationUsers: {
          disconnect: conversation.conversationUsers.map(
            (conversationUser) => ({ userId: conversationUser.userId })
          ),
        },
      },
      where: { conversationId },
    });

    await prismaClient.conversation.delete({ where: { conversationId } });

    return {
      message: "Conversation a été supprimée avec succés.",
    };
  }
}
