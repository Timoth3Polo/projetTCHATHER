import "reflect-metadata";
import { decode } from "jsonwebtoken";
import superTest from "supertest";
import { app } from "../index";
import { prismaClient } from "../utils/prismaClient";
import { TestUtils } from "../utils/test/TestUtils";

let testData: any = {};
let conversation: any;
let convo1Endpoint: any;
let convo2Endpoint: any;
let createdMessage: any;
beforeAll(async () => {
  await TestUtils.dumpDatabase();
  testData = await TestUtils.createTestData();
  convo1Endpoint = `/api/conversations/${testData.conversations.conversationUser1OwnerWithUser2.conversationId}/messages`;
  convo2Endpoint = `/api/conversations/${testData.conversations.conversationUser3OwnerWithUser4.conversationId}/messages`;
});

describe("MessageController tests", () => {
  test("Message cannot be send to an non-existent conversation", async (done) => {
    await superTest(app)
      .put("/api/conversations/convoquiexisteap/messages")
      .set("authorization", testData.usersToken.user1Token)
      .send({
        messageText: "Thomas aime le chocolat.",
        messageAttachments: [],
      })
      .expect(404);
    done();
  });

  test("Message can't be send without text.", async (done) => {
    await superTest(app)
      .put(convo1Endpoint)
      .set("authorization", testData.usersToken.user1Token)
      .send({
        messageText: "",
        messageAttachments: [],
      })
      .expect(400);
    done();
  });

  test("User not in conversation cannot be able to send message.", async (done) => {
    await superTest(app)
      .put(convo1Endpoint)
      .set("authorization", testData.usersToken.user3Token)
      .send({
        messageText: "Thomas aime le chocolat.",
        messageAttachments: [],
      })
      .expect(401);
    done();
  });

  test("Owner of the conversation should be able to send a Message", async (done) => {
    await superTest(app)
      .put(convo1Endpoint)
      .set("authorization", testData.usersToken.user1Token)
      .send({
        messageText: "Thomas aime le chocolat.",
        messageAttachments: [],
      })
      .expect(200)
      .then(({ body }) => {
        conversation = body;
        expect(body.messageText).toBe("Thomas aime le chocolat.");
      });
    done();
  });

  test("Guest user should be able to send message.", async (done) => {
    await superTest(app)
      .put(convo1Endpoint)
      .set("authorization", testData.usersToken.user2Token)
      .send({
        messageText: "Thomas aime le chocolat.",
        messageAttachments: [],
      })
      .expect(200)
      .then(({ body }) => {
        createdMessage = body;
        expect(body.messageText).toBe("Thomas aime le chocolat.");
      });
    done();
  });

  test("User that not create the message should not be able to delete it", async (done) => {
    await superTest(app)
      .delete(`${convo1Endpoint}/${createdMessage.messageId}`)
      .set("authorization", testData.usersToken.user3Token)
      .send()
      .expect(401);
    done();
  });
  test("User that send the message should be able to delete it", async (done) => {
    await superTest(app)
      .delete(`${convo1Endpoint}/${createdMessage.messageId}`)
      .set("authorization", testData.usersToken.user2Token)
      .send()
      .expect(200);
    done();
  });
});

// messageId String @id @default(uuid())
//   messageText String
//   messageAttachements Attachement[]
//   conversations Conversation[]
