/**
 * @swagger
 * tags:
 *   name: Farmers
 *   description: Operations related to farmers
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FarmerTypeList:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the farmer
 *         name:
 *           type: string
 *           description: The name of the farmer
 *         farms:
 *           type: array
 *           description: The farms associated with the farmer
 *           items:
 *             type: string
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
 *               distance:
 *                 type: string
 *               farmer_id:
 *                 type: string
 *             required:
 *               - name
 *               - distance
 *               - farmer_id
 *     responses:
 *       201:
 *         description: Farmer successfully created
 */

/**
 * @swagger
 * /farmers:
 *   get:
 *     tags: [Farmers]
 *     summary: Get all farmers
 *     responses:
 *       200:
 *         description: List of farmers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FarmerTypeList'
 */
