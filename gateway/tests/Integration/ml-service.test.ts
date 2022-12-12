import Repositories from "../Repositories/index.js";
import Factory from "../Factory/index.js";

beforeEach(async () => {
  await Repositories.redis.clean();
});

describe("ML-SERVICE TEST: AUTH, SCHEMA, AND RATING", () => {
  it("Send request withou ", async () => {
    const user = Factory.redis.newUser();

    const result = await Repositories.redis.setLog(user, 4);
    expect(result).toEqual("OK");
  });

  it("Read user", async () => {
    const user = Factory.redis.newUser();

    try {
      await Repositories.redis.setLog(user, 4);

      const readVerify = await Repositories.redis.read(user);

      expect(readVerify).toEqual("true");
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it("User lifetime", async () => {
    const user = Factory.redis.newUser();

    try {
      await Repositories.redis.setLog(user, 1);

      await new Promise((r) => setTimeout(r, 2000));

      const readVerify = await Repositories.redis.read(user);

      expect(readVerify).toBeNull();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });
});

afterAll(async () => {
  Repositories.redis.disconnect();
  Repositories.validAccess.disconnect();
});
