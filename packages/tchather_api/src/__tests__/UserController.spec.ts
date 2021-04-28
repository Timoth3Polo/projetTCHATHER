import "reflect-metadata";
import superTest from "supertest";
import { app } from "../index";
import { TestUtils } from "../utils/test/TestUtils";

let testData: any = {};
beforeAll(async () => {
  await TestUtils.dumpDatabase();
  testData = await TestUtils.createTestData();
});
describe("UserController tests", () => {
  test("User with bad confirm password should no be able to register", async (done) => {
    await superTest(app)
      .post("/api/users/register")
      .send({
        userName: "tim",
        userEmail: "tim@tim.com",
        userPassword: "Test1213#azdazd",
        userConfirmPassword: "Test1213azdazdazd#",
      })
      .expect(400);
    done();
  });

  test("User should be able to register", async (done) => {
    const user = {
      userName: "tim",
      userEmail: "tim@tim.com",
      userPassword: "Test1213#azdazd",
      userConfirmPassword: "Test1213#azdazd",
    };

    await superTest(app)
      .post("/api/users/register")
      .send(user)
      .expect(200)
      .then((response) => {
        expect(response.body.userName).toBe(user.userName);
        expect(response.body.userEmail).toBe(user.userEmail);
        expect(response.body.userConversations.length).toBe(0);
      });
    done();
  });

  test("User found should be able to login", async (done) => {
    const user = { ...testData.users[0], userPassword: "test" };

    await superTest(app)
      .post("/api/users/login")
      .send(user)
      .expect(200)
      .then((response) => {
        expect(response.body.userToken).toBeDefined();
      });
    done();
  });

  test("User found but shouldn't be able to login", async (done) => {
    const user = { ...testData.users[0], userPassword: "IamABadPassword" };

    await superTest(app).post("/api/users/login").send(user).expect(400);
    done();
  });

  test("User not found", async (done) => {
    const user = {
      userEmail: "tim@notTim.com",
      userPassword: "Test1213#azdazd",
    };

    await superTest(app).post("/api/users/login").send(user).expect(404);
    done();
  });
});
