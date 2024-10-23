const express = require("express");

const userController = require("../controllers/userController");
const authenticateToken = require("../middlewares/auth/authenticate");
const createFarmerMiddleware = require("../middlewares/farmer/createFarmerMiddleware");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Farmers
 *   description: Operações relacionadas a usuários
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro de validação
 *       403:
 *         description: Acesso negado
 *       500:
 *         description: Erro no servidor
 */
router.post(
  "/farmers",
  createFarmerMiddleware,
  authenticateToken,
  userController.createUser
);

module.exports = router;
