import { User } from ".prisma/client";
import { messageCreateSchema } from "@tchather/common";
import {
  Authorized,
  BadRequestError,
  Body,
  CurrentUser,
  Delete,
  JsonController,
  NotFoundError,
  Param,
  Put,
  UnauthorizedError,
} from "routing-controllers";
import { prismaClient } from "../utils/prismaClient";
import { Asserts } from "yup";

@Authorized()
@JsonController("/conversations/:conversationId/messages")
export class MessageController {
  @Put("/")
  async putNewMessage(
    @Param("conversationId") conversationId: string,
    @CurrentUser() currentUser: User,
    @Body() messageData: Asserts<typeof messageCreateSchema>
  ) {
    try {
      await messageCreateSchema.validate(messageData, {
        //renvoie toutes les erreurs qui existent
        abortEarly: false,
        //permet de prendre que les infos qui nous intéresse
        stripUnknown: true,
      });
    } catch (error) {
      throw new BadRequestError(error);
    }

    const conversation = await prismaClient.conversation.findUnique({
      where: {
        conversationId,
      },
      include: {
        conversationUsers: true,
      },
    });

    if (!conversation) {
      throw new NotFoundError("La conversation n'a pas été trouvé.");
    }

    //check si l'utilisateur a le droit d'écrire dans la conversation
    const isUserInConversation = conversation.conversationUsers.find(
      (conversationUser) => conversationUser.userId === currentUser.userId
    );

    if (!isUserInConversation) {
      throw new UnauthorizedError(
        "Vous n'êtes pas autorisé à envoyer de messages dans cette conversation."
      );
    }

    const newMessage = await prismaClient.message.create({
      data: {
        messageText: messageData.messageText,
        conversations: {
          connect: {
            conversationId,
          },
        },
        messageUserSender: {
          connect: {
            userId: currentUser.userId,
          },
        },
      },
    });

    return newMessage;
  }

  @Delete("/:messageId")
  async deleteMessage(
    @Param("conversationId") conversationId: string,
    @Param("messageId") messageId: string,
    @CurrentUser() currentUser: User
  ) {
    //on cherche si le message à supprimer existe
    const message = await prismaClient.message.findUnique({
      where: {
        messageId,
      },
      include: {
        messageUserSender: true,
      },
    });

    if (!message) {
      throw new NotFoundError("Le message n'a pas été trouvé.");
    }

    //vérifier que l'user peut bien effacer le message
    const isUserAbleToDeleteMessage =
      message.messageUserSender.userId === currentUser.userId;

    if (!isUserAbleToDeleteMessage) {
      throw new UnauthorizedError(
        "L'utilisateur ne peut pas supprimer le message."
      );
    }

    //Update du message sur les conversations
    await prismaClient.message.update({
      data: {
        conversations: {
          disconnect: {
            conversationId,
          },
        },
      },
      where: {
        messageId,
      },
    });

    //Suppression du message
    await prismaClient.message.delete({
      where: {
        messageId,
      },
    });

    return { message: "Le message a bien été supprimé." };
  }
}
