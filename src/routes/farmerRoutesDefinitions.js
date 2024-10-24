/**
 * @swagger
 * tags:
 *   name: Farmers
 *   description: Operations related to farmers
 */

/**
 * @swagger
 * /farmers:
 *   post:
 *     tags: [Farmers]
 *     summary: Creates a new farmer
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
 *         description: Farmer successfully created
 *       400:
 *         description: Validation error
 *       403:
 *         description: Access denied
 *       500:
 *         description: Server error
 */
