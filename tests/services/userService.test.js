// const Joi = require("joi");
// const { expect } = require("chai");
// const { faker } = require("@faker-js/faker");

// const userService = require("../../src/services/userService");

// const createUser = () => ({
//   name: faker.person.fullName(),
//   email: faker.internet.email(),
//   password: faker.internet.password(),
// });

// describe("User Service", () => {
//   before(() => {
//     require("../../src/config/env");
//   });

//   describe("createUser", () => {
//     it("Deve criar um usuário", async () => {
//       const user = createUser();
//       const id = await userService.createUser(user);

//       expect(id).to.be.a("string");
//     });

//     const invalidUsers = [
//       {
//         ...createUser(),
//         name: "",
//       },
//       {
//         ...createUser(),
//         email: "",
//       },
//       {
//         ...createUser(),
//         email: "invalid-email",
//       },
//       {
//         ...createUser(),
//         password: "",
//       },
//       {
//         ...createUser(),
//         password: "short",
//       },
//     ];

//     for (const invalidUser of invalidUsers) {
//       it(`Deve retornar um erro se os dados do usuário forem inválidos: ${JSON.stringify(
//         invalidUser
//       )}`, async () => {
//         try {
//           await userService.createUser(invalidUser);
//         } catch (error) {
//           expect(error).to.be.instanceOf(Joi.ValidationError);
//         }
//       });
//     }

//     it("Deve retornar um erro se o usuário ja existir", async () => {
//       try {
//         // Cria um usuário
//         const user = createUser();

//         await userService.createUser(user);

//         // Tenta criar o mesmo usuário
//         await userService.createUser(user);
//       } catch (error) {
//         expect(error).to.be.instanceOf(Error);
//         expect(error.message).to.equal("USER_ALREADY_EXISTS");
//       }
//     });
//   });
// });
