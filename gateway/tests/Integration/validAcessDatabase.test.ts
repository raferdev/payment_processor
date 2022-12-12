import Repositories from "../Repositories/prisma.js";
import Factory from "../Factory/validAccess.js";

beforeEach(async () => {
  await Repositories.validAccess.clean();
});

describe("PRISMA CONNECTIVITY TEST: CRUD ", () => {
  it("Create new credentials", async () => {
    const user = Factory.validAccess.newOne();

    const result = await Repositories.validAccess.add(user);
    expect(result.user).toEqual(user.user);
  });

  it("Read credential", async () => {
    const user = Factory.validAccess.newOne();

    try {
      await Repositories.validAccess.add(user);
      const readVerify = await Repositories.validAccess.find(user.user);
      expect(readVerify.user).toEqual(user.user);
    } catch (error) {
      console.log(error);
      expect(error).toBeUndefined();
    }
  });

  it("Update credentials", async () => {
    const user = Factory.validAccess.newOne();
    const newToken = Factory.validAccess.newToken();

    try {
      await Repositories.validAccess.add(user);
      const verifyUpdate = await Repositories.validAccess.updateToken(
        user.user,
        newToken
      );
      expect(verifyUpdate.token).toEqual(newToken);
    } catch (error) {
      console.log(error);
      expect(error).toBeUndefined();
    }
  });

  it("Delete credentials", async () => {
    const user = Factory.validAccess.newOne();

    try {
      await Repositories.validAccess.add(user);
      await Repositories.validAccess.clean();

      const verifyClearning = await Repositories.validAccess.find(user.user);

      expect(verifyClearning).toBeNull();
    } catch (error) {
      expect(error.code).toEqual("P2025");
    }
  });
});

afterAll(async () => {
  await Repositories.disconnect();
});
