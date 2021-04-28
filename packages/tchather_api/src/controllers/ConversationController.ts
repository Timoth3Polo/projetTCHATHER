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
  Put,
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
      },
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
  async getConversation() {}

  @Delete("/:conversationId")
  async deleteConversation() {}
}
