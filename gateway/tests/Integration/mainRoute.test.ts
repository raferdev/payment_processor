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

  it("Valid toke can acess", async () => {
    jest.clearAllMocks();

    const body = Factory.request.data();
    const user = Factory.validAccess.newOne();
    jest.clearAllMocks();
    jest.spyOn(paymentShema, "validate").mockImplementationOnce(() => {
      throw { type: "AuthTest", message: "all ok" };
    });

    try {
      await Repositories.validAccess.add(user);

      const result = await supertest(app).post(`/${user.token}`).send(body);
      expect(result.body.message).toEqual("all ok");
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  it("Same user doing multiple requests, must be rejected", async () => {
    jest.clearAllMocks();

    const body = Factory.request.data();
    const user = Factory.validAccess.newOne();

    jest.spyOn(axios, "post").mockImplementation(() => {
      throw { type: "firewallTest", message: "all ok" };
    });
    try {
      await Repositories.validAccess.add(user);
      await supertest(app).post(`/${user.token}`).send(body);
      const result = await supertest(app).post(`/${user.token}`).send(body);
      expect(result.body.type).toEqual("Too much requests");
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  it("Wrong body schema, this request must fail", async () => {
    jest.clearAllMocks();
    const body = Factory.request.data();
    const user = Factory.validAccess.newOne();
    delete body.transaction_amount;
    try {
      await Repositories.validAccess.add(user);
      const result = await supertest(app).post(`/${user.token}`).send(body);
      expect(result.statusCode).toEqual(422);
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  it("Acceptable request, must return status 200", async () => {
    const body = Factory.request.data();
    const user = Factory.validAccess.newOne();
    try {
      await Repositories.validAccess.add(user);
      const result = await supertest(app).post(`/${user.token}`).send(body);
      expect(result.statusCode).toEqual(200);
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });
});

afterAll(async () => {
  Repositories.redis.disconnect();
  Repositories.validAccess.disconnect();
});
