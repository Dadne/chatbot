const express = require('express');
const {generateConversation} = require('../controllers/chatbot')
const router = express.Router();

/**
 * Crea el registro del Chatbot
 */
/**
 * Register new Chatbot
 * @swagger
 * /chatbot:
 *    post:
 *      tags:
 *        - chatbot
 *      summary: "chatbot"
 *      description: chatbot
 *      responses:
 *        '200':
 *          description: Returns the menssage chatbot
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/chatbot"
 */
router.post('/', generateConversation);

module.exports = router;
