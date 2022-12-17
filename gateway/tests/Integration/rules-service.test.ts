import Repositories from "../Repositories/index.js";
import Factory from "../Factory/index.js";
import supertest from "supertest";
import app from "../../src/app.js";

describe("RULES-SERVICE TEST: AUTH, SCHEMA, AND BLACKLIST", () => {
  it("Send request with invalid intern token, should return error ", async () => {
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

  it("Send wrong schema, should return error", async () => {
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

  it("Rating test, should return status 200", async () => {
    const body = Factory.request.data();
    try {
      const result = await supertest(app)
        .post(`/health/mlservice`)
        .set("authorization", "")
        .send(body);

      expect(result.status).toEqual(200);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });
});

afterAll(async () => {
  Repositories.redis.disconnect();
  Repositories.validAccess.disconnect();
});
