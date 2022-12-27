import Repositories from "../Repositories/index.js";
import Factory from "../Factory/index.js";
import supertest from "supertest";
import app from "../../src/app.js";
import { jest } from "@jest/globals";
import { paymentShema } from "../../src/schemas/apiSchemas.js";
import axios from "axios";

beforeEach(async () => {
  await Repositories.validAccess.clean();
});

describe("TESTING MAIN ROUTE BEHAVIOR", () => {
  it("Wrong token, this must be rejected", async () => {
    const body = Factory.request.data();
    const token = Factory.request.newToken();

    const result = await supertest(app).post(`/${token}`).send(body);

    expect(result.body.type).toEqual("unauthorized");
  });
  it("Without token, this must return 404", async () => {
    const body = Factory.request.data();

    const result = await supertest(app).post(`/`).send(body);

    expect(result.statusCode).toEqual(404);
  });

  it("Valid token can acess", async () => {
    jest.clearAllMocks();

    const body = Factory.request.data();
    const user = await Factory.validAccess.NewCredential();
    const addToken = await Repositories.validAccess.addToken({
      token: user.token,
      user_id: user.id,
      are_valid: true,
    });

    jest.spyOn(paymentShema, "validate").mockImplementationOnce(() => {
      throw { type: "AuthTest", message: "all ok" };
    });

    try {
      const result = await supertest(app)
        .post(`/${user.token}`)
        .set("authorization", addToken.token)
        .send(body);
      expect(result.body.message).toEqual("all ok");
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  it("Same user doing multiple requests, must be rejected", async () => {
    jest.clearAllMocks();

    const body = Factory.request.data();
    const user = await Factory.validAccess.NewCredential();
    const addToken = await Repositories.validAccess.addToken({
      token: user.token,
      user_id: user.id,
      are_valid: true,
    });

    jest.spyOn(axios, "post").mockImplementationOnce(() => {
      throw { type: "firewallTest", message: "all ok" };
    });
    try {
      await supertest(app)
        .post(`/${user.token}`)
        .set("authorization", addToken.token)
        .send(body);
      const result = await supertest(app)
        .post(`/${user.token}`)
        .set("authorization", addToken.token)
        .send(body);

      expect(result.body.type).toEqual("Too much requests");
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  it("Wrong body schema, this request must fail", async () => {
    jest.clearAllMocks();
    const body = Factory.request.data();
    const user = await Factory.validAccess.NewCredential();
    const addToken = await Repositories.validAccess.addToken({
      token: user.token,
      user_id: user.id,
      are_valid: true,
    });
    delete body.transaction_amount;
    try {
      const result = await supertest(app)
        .post(`/${user.token}`)
        .set("authorization", addToken.token)
        .send(body);
      expect(result.statusCode).toEqual(422);
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  it("Acceptable request, must return status 200", async () => {
    jest.clearAllMocks();
    const body = Factory.request.data();
    const user = await Factory.validAccess.NewCredential();
    const addToken = await Repositories.validAccess.addToken({
      token: user.token,
      user_id: user.id,
      are_valid: true,
    });
    try {
      const result = await supertest(app)
        .post(`/${user.token}`)
        .set("authorization", addToken.token)
        .send(body);

      expect(
        result.statusCode === 200 || result.statusCode === 406
      ).toBeTruthy();
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });
});

afterAll(async () => {
  Repositories.redis.disconnect();
  Repositories.validAccess.disconnect();
});
