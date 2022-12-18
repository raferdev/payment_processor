import Repositories from "../Repositories/index.js";
import Factory from "../Factory/index.js";
import supertest from "supertest";
import app from "../../src/app.js";

describe("RULES-SERVICE TEST: AUTH, SCHEMA, AND BLACKLIST", () => {
  it("Send request with invalid intern token, should return error 401 ", async () => {
    const body = Factory.request.data();

    try {
      const result = await supertest(app)
        .post(`/health/rulesservice`)
        .set("authorization", "123")
        .send(body);

      expect(result.status).toEqual(401);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it("Send wrong schema, should return error 422", async () => {
    const body = Factory.request.data();
    delete body.transaction_id;
    try {
      const result = await supertest(app)
        .post(`/health/rulesservice`)
        .set("authorization", "")
        .send(body);

      expect(result.status).toEqual(422);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it("Send blacklist user (id = 1 default user), should return status 406", async () => {
    const body = Factory.request.data();

    body.user_id = 1;

    try {
      const result = await supertest(app)
        .post(`/health/rulesservice`)
        .set("authorization", "")
        .send(body);

      expect(result.status).toEqual(406);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });
});

afterAll(async () => {
  Repositories.redis.disconnect();
  Repositories.validAccess.disconnect();
});
