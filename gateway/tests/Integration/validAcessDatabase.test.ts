import Repositories from "../Repositories/index.js";
import Factory from "../Factory/index.js";

beforeEach(async () => {
  await Repositories.validAccess.clean();
});

describe("PRISMA CONNECTIVITY TEST: CRUD ", () => {
  it("Create new credentials", async () => {
    const user = await Factory.validAccess.NewUser();

    const result = await Repositories.validAccess.addUser(user);
    expect(result.user).toEqual(user.user);
  });

  it("Read credential", async () => {
    const user = await Factory.validAccess.NewUser();

    try {
      await Repositories.validAccess.addUser(user);
      const readVerify = await Repositories.validAccess.find(user.user);
      expect(readVerify.user).toEqual(user.user);
    } catch (error) {
      console.log(error);
      expect(error).toBeUndefined();
    }
  });

  it("Update credentials", async () => {
    const user = await Factory.validAccess.NewCredential();
    const addToken = await Repositories.validAccess.addToken({
      token: user.token,
      user_id: user.id,
      are_valid: true,
    });
    const newToken = await Factory.validAccess.NewToken(user);

    try {
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
    const user = await Factory.validAccess.NewCredential();

    try {
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
