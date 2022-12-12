import Repositories from "../Repositories/index.js";
import Factory from "../Factory/index.js";

beforeEach(async () => {
  await Repositories.validAccess.clean();
});

describe("PRISMA CONNECTIVITY TEST: CRUD ", () => {
  it("Create new credentials", async () => {
    const user = await Factory.validAccess.credentials();

    const result = await Repositories.validAccess.add(user);
    expect(result.token).toEqual(user.token);
  });

  it("Read credential", async () => {
    const user = await Factory.validAccess.credentials();

    try {
      await Repositories.validAccess.add(user);
      const readVerify = await Repositories.validAccess.find(user.newUser.user);
      expect(readVerify.user).toEqual(user.newUser.user);
    } catch (error) {
      console.log(error);
      expect(error).toBeUndefined();
    }
  });

  it("Update credentials", async () => {
    const user = await Factory.validAccess.credentials();
    const newToken = await Factory.validAccess.newToken(user.newUser);

    try {
      await Repositories.validAccess.add(user);
      const verifyUpdate = await Repositories.validAccess.updateToken(
        user.token,
        newToken
      );

      expect(verifyUpdate.token).toEqual(newToken);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it("Delete credentials", async () => {
    const user = await Factory.validAccess.credentials();

    try {
      await Repositories.validAccess.add(user);
      await Repositories.validAccess.clean();

      const verifyClearning = await Repositories.validAccess.find(
        user.newUser.user
      );

      expect(verifyClearning).toBeNull();
    } catch (error) {
      expect(error.code).toEqual("P2025");
    }
  });
});

afterAll(async () => {
  Repositories.validAccess.disconnect();
  Repositories.redis.disconnect();
});
