// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../../src/index'); // Ajuste conforme necessário
// const { expect } = chai;

// chai.use(chaiHttp);

// describe('User Controller', () => {
//   it('deve retornar 201 ao criar um usuário', (done) => {
//     const newUser = {
//       name: 'John Doe',
//       email: 'john.doe@example.com'
//     };

//     chai.request(app)
//       .post('/api/users')
//       .send(newUser)
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res.body).to.have.property('id');
//         done();
//       });
//   });

//   it('deve retornar 400 se os dados forem inválidos', (done) => {
//     const invalidUser = {
//       name: '', // Nome inválido
//       email: 'not-an-email'
//     };

//     chai.request(app)
//       .post('/api/users')
//       .send(invalidUser)
//       .end((err, res) => {
//         expect(res).to.have.status(400);
//         expect(res.body).to.have.property('message').that.equals('Validation failed');
//         done();
//       });
//   });
// });
