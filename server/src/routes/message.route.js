const router = require('express').Router()
const authMiddleware = require('../middlewares/auth')
const {sendMessage,getMessages,markSingleMessage} = require("../controllers/message.controller")

router.post("/send/:receiverId",authMiddleware,sendMessage)
router.get("/get/:senderId",authMiddleware,getMessages)
router.post('/mark/:messageId',authMiddleware,markSingleMessage)

module.exports = router