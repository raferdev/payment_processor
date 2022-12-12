import { faker } from "@faker-js/faker";

function newUser() {
  const newUser = {
    user: faker.random.numeric(5),
  };
  return newUser;
}

export const redis = {
  newUser,
};
