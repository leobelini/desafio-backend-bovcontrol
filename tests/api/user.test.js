const chai = require("chai");
const chaiHttp = require("chai-http");
const { faker } = require("@faker-js/faker");

const app = require("../../src/index");

const { expect } = chai;

chai.use(chaiHttp);

const createUser = () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

describe("User API", () => {
  // before(() => {
  //   require("../../src/config/env");
  // });

  describe(`POST /api/users`, () => {
    it(`Deve criar um novo usuário e retornar 201`, (done) => {
      const user = createUser();

      chai
        .request(app)
        .post("/api/users")
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
  });

  //   // Teste para criar um novo usuário
  //   describe('POST /api/users', () => {
  //     it('deve criar um novo usuário e retornar 201', (done) => {
  //       const newUser = {
  //         name: 'John Doe',
  //         email: 'john.doe@example.com'
  //       };

  //       chai.request(app)
  //         .post('/api/users')
  //         .send(newUser)
  //         .end((err, res) => {
  //           expect(res).to.have.status(201);
  //           expect(res.body).to.have.property('id');
  //           expect(res.body.name).to.equal(newUser.name);
  //           expect(res.body.email).to.equal(newUser.email);
  //           done();
  //         });
  //     });

  //     it('deve retornar 400 se os dados do usuário forem inválidos', (done) => {
  //       const invalidUser = {
  //         name: '', // Nome inválido
  //         email: 'not-an-email'
  //       };

  //       chai.request(app)
  //         .post('/api/users')
  //         .send(invalidUser)
  //         .end((err, res) => {
  //           expect(res).to.have.status(400);
  //           expect(res.body).to.have.property('message').that.equals('Validation failed');
  //           done();
  //         });
  //     });
  //   });
});
