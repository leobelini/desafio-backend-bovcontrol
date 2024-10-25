/**
 * @swagger
 * tags:
 *   name: Farms
 *   description: Operations related to farms
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FarmTypeList:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the farmer
 *         name:
 *           type: string
 *           description: The name of the farm
 *         distance:
 *           type: number
 *           description: The distance of the farm in kilometers
 *         farmerId:
 *           type: string
 *           description: The unique identifier of the farmer
 */

/**
 * @swagger
 * /farms:
 *   post:
 *     tags: [Farms]
 *     summary: Creates a new farm
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Farm 1
 *               distance:
 *                 type: number
 *                 example: 10
 *               farmerId:
 *                 type: string
 *                 example: 123456
 *             required:
 *               - name
 *               - distance
 *               - farmerId
 *     responses:
 *       201:
 *         description: Farm created
 */

/**
 * @swagger
 * /farms:
 *   get:
 *     tags: [Farms]
 *     summary: Get all farms
 *     responses:
 *       200:
 *         description: List of farms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FarmTypeList'
 */
