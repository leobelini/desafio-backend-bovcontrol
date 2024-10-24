/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User-related operations
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Creates a new user
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
 *         description: User successfully created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
