/**
 * @swagger
 *
 * components:
 *   schemas:
 *     ChatMessageDto:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         createdOn:
 *           type: string
 *         content:
 *           type: string
 *         roomNumber:
 *           type: integer
 *         files:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FileDto'
 *       required:
 *         - roomNumber
 *         - content
 *         - username
 */
