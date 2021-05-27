import { prismaClient } from "../prismaClient";
import { hash } from "bcrypt";
import superTest from "supertest";
import { app } from "./../../index";
export class TestUtils {
  static async dumpDatabase() {
    await prismaClient.attachment.deleteMany({});
    await prismaClient.message.deleteMany({});
    await prismaClient.conversation.deleteMany({});
    await prismaClient.user.deleteMany({});
  }

  static async createTestData() {
    const defaultPassword = await hash("test", 12);
    await prismaClient.user.createMany({
      data: [
        {
          userEmail: "user1@test.com",
          userPassword: defaultPassword,
          userName: "user1",
        },
        {
          userEmail: "user2@test.com",
          userPassword: defaultPassword,
          userName: "user2",
        },
        {
          userEmail: "user3@test.com",
          userPassword: defaultPassword,
          userName: "user3",
        },
        {
          userEmail: "user4@test.com",
          userPassword: defaultPassword,
          userName: "user4",
        },
      ],
      skipDuplicates: true,
    });
    const users = await prismaClient.user.findMany();

    const convo1 = await prismaClient.conversation.create({
      data: {
        conversationName: "Convo 1",
        conversationType: "GROUP",
        conversationUsers: {
          connect: [{ userId: users[0].userId }, { userId: users[1].userId }],
        },
        conversationUserOwner: {
          connect: {
            userId: users[0].userId,
          },
        },
      },
      select: {
        conversationId: true,
        conversationMessages: true,
        conversationName: true,
        conversationType: true,
        conversationUserOwner: true,
        conversationUserOwnerId: true,
        conversationUsers: true,
      }
    });
    const convo2 = await prismaClient.conversation.create({
      data: {
        conversationName: "Convo 2",
        conversationType: "GROUP",
        conversationUsers: {
          connect: [{ userId: users[2].userId }, { userId: users[3].userId }],
        },
        conversationUserOwner: {
          connect: {
            userId: users[2].userId,
          },
        },
      },
      select: {
        conversationId: true,
        conversationMessages: true,
        conversationName: true,
        conversationType: true,
        conversationUserOwner: true,
        conversationUserOwnerId: true,
        conversationUsers: true,
      }
    });

    const user1Token = await this.requestToken(users[0]);
    const user2Token = await this.requestToken(users[1]);
    const user3Token = await this.requestToken(users[2]);
    const user4Token = await this.requestToken(users[3]);
    return {
      users,
      usersToken: {
        user1Token,
        user2Token,
        user3Token,
        user4Token,
      },
      conversations: {
        conversationUser1OwnerWithUser2: convo1,
        conversationUser3OwnerWithUser4: convo2,
      }
      
    };
  }

  private static async requestToken(user: any) {
    const token = await superTest(app)
      .post("/api/users/login")
      .send({ ...user, userPassword: "test" });
    return `Bearer ${token.body.userToken}`;
  }
}
