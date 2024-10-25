/**
 * @swagger
 * tags:
 *   name: Milk Productions
 *   description: Operations related to milk productions
 */

/**
 * @swagger
 * /milk-productions:
 *   post:
 *     tags: [Milk Productions]
 *     summary: Creates a new milk production
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               farmId:
 *                 type: string
 *                 example: 123456
 *               liters:
 *                 type: number
 *                 example: 100
 *               date:
 *                 type: string
 *                 example: 2022-01-01T00:00:00.000Z
 *             required:
 *               - farmId
 *               - liters
 *               - date
 *     responses:
 *       201:
 *         description: Milk production created
 */
