import { prismaClient } from "../prismaClient";
import { hash } from "bcrypt";
import superTest from "supertest";
import { app } from "./../../index";
export class TestUtils {
  static async dumpDatabase() {
    await prismaClient.attachement.deleteMany({});
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
    };
  }

  private static async requestToken(user: any) {
    const token = await superTest(app)
      .post("/api/users/login")
      .send({ ...user, userPassword: "test" });
    return `Bearer ${token.body.userToken}`;
  }
}
