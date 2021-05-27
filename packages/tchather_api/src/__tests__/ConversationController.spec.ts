import { decode } from "jsonwebtoken";
import "reflect-metadata";
import superTest from "supertest";
import { app } from "../index";
import { prismaClient } from "../utils/prismaClient";
import { TestUtils } from "../utils/test/TestUtils";

let testData: any = {};
let user1CreatedConversation: any;

beforeAll(async () => {
  await TestUtils.dumpDatabase();
  testData = await TestUtils.createTestData();
});
// conversationName String
// conversationUsers User[]

describe("UserController tests", () => {
  test("Unauthenticated user cannot be able to create conversation", async (done) => {
    await superTest(app)
      .put("/api/conversations")
      .send({
        conversationName: "ThomasTeam",
        conversationUsers: [testData.users[0].userId],
      })
      .expect(401);
    done();
  });
  
  test("User with bad JWT cannot be able to create conversation", async (done) => {
    await superTest(app)
      .put("/api/conversations")
      .set("authorization", "Bearer kfoefefefof$45")
      .send({
        conversationName: "ThomasTeam",
        conversationUsers: [testData.users[0].userId],
      })
      .expect(401);
    done();
  });

  test("authenticated user should be able to create a conversation", async (done) => {
    
    await superTest(app)
      .put("/api/conversations")
      .set("authorization", testData.usersToken.user1Token)
      .send({
        conversationName: "ThomasTeam",
        conversationUsers: [testData.users[1].userId],
      })
      .expect(200)
      .then(({body}) => {
        user1CreatedConversation = body;
        expect(body.conversationName).toBe("ThomasTeam"),
        expect(body.conversationUsers.length).toBe(2)
      })
    done();
  });

  test("Conversation creator should be able to get conversation", async (done) => {
    await superTest(app)
      .get(`/api/conversations/${user1CreatedConversation.conversationId}`)
      .set("authorization", testData.usersToken.user1Token)
      .send()
      .expect(200)
      .then(({body}) => {
        expect(body.conversationName).toBe("ThomasTeam"),
        expect(body.conversationUsers.length).toBe(2)
      })
    done();
  });

  test("user invited inside conversation should be able to get conversation", async (done) => {
    await superTest(app)
      .get(`/api/conversations/${user1CreatedConversation.conversationId}`)
      .set("authorization", testData.usersToken.user2Token)
      .send()
      .expect(200)
      .then(({body}) => {
        expect(body.conversationName).toBe("ThomasTeam"),
        expect(body.conversationUsers.length).toBe(2)
      })
    done();
  });

  test("user not invited inside conversation should not be able to get conversation", async (done) => {
    await superTest(app)
      .get(`/api/conversations/${user1CreatedConversation.conversationId}`)
      .set("authorization", testData.usersToken.user3Token)
      .send()
      .expect(401)
    done();
  });

  test("User not owner of the conversation should not be able to delete it", async (done) => {
    await superTest(app)
      .delete(`/api/conversations/${user1CreatedConversation.conversationId}`)
      .set("authorization", testData.usersToken.user2Token)
      .send()
      .expect(401)
    done();
  });

  test("Owner of the conversation should be able to delete it", async (done) => {
    await superTest(app)
      .delete(`/api/conversations/${user1CreatedConversation.conversationId}`)
      .set("authorization", testData.usersToken.user1Token)
      .send()
      .expect(200)
    done();
  });
});