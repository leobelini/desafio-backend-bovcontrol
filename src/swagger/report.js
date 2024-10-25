/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Operations related to reports
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FarmMilkProductionMonthReport:
 *       type: object
 *       properties:
 *         [year]:
 *           type: object
 *           description: The milk production report for the year
 *           properties:
 *             productions:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   day:
 *                     type: number
 *                     example: 1
 *                   liters:
 *                     type: number
 *                     example: 100
 *             totalLiters:
 *               type: number
 *               example: 100
 *             dailyAverage:
 *               type: number
 *               example: 100
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FarmMilkPaymentYearReport:
 *       type: object
 *       properties:
 *         [month]:
 *           type: object
 *           description: The milk payment report for the month
 *           properties:
 *             pricePTBR:
 *               type: string
 *               example: 100.000
 *             priceUSD:
 *               type: string
 *               example: 100,000
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FarmerPaymentMonthReport:
 *       type: object
 *       properties:
 *         [year]:
 *           type: object
 *           description: The milk payment report for the month
 *           properties:
 *             pricePTBR:
 *               type: string
 *               example: 100.000
 *             priceUSD:
 *               type: string
 *               example: 100,000
 */

/**
 * @swagger
 * /reports/farms/:farmId/milk-production/month/:month:
 *   get:
 *     tags: [Reports]
 *     summary: Get milk production report
 *     parameters:
 *       - name: farmId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the farm
 *       - name: month
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The month of the report
 *     responses:
 *       200:
 *         description: Milk production report
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FarmMilkProductionMonthReport'
 */

/**
 * @swagger
 * /reports/farms/:farmId/milk-payment/year/:year:
 *   get:
 *     tags: [Reports]
 *     summary: Get milk payment report
 *     parameters:
 *       - name: farmId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the farm
 *       - name: year
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The year of the report
 *     responses:
 *       200:
 *         description: Milk payment report
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FarmMilkPaymentYearReport'
 */

/**
 * @swagger
 * /reports/farmers/:farmerId/payment/month/:month:
 *   get:
 *     tags: [Reports]
 *     summary: Get farmer payment report
 *     parameters:
 *       - name: farmerId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the farmer
 *       - name: month
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The month of the report
 *     responses:
 *       200:
 *         description: Farmer payment report
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FarmerPaymentMonthReport'
 */
