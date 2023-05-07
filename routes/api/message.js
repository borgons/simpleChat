const express = require('express')
const router = express.Router()
const {
  getChat,
  getContacts,
  addContact,
  sendChat,
  deleteChat
} = require ('../../controller/chatController') 

const { protect } = require('../../middleware/authMiddleware')

router.get('/chats',protect ,getChat)
router.get('/contacts', protect, getContacts)
router.post('/addContact', protect, addContact)
router.post('/send', protect, sendChat)
router.delete('/deleteChat/:id', protect, deleteChat)

module.exports = router