import { faker } from "@faker-js/faker";

function newOne() {
  const acess = {
    token: faker.datatype.uuid(),
    user: faker.fake.name,
  };
  return acess;
}

function newToken() {
  const token = faker.datatype.uuid();
  return token;
}

export const validAccess = {
  newOne,
  newToken,
};
