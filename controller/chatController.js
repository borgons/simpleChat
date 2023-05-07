const asyncHandler = require('express-async-handler')

const Message = require('../models/Message')
const Contact = require('../models/Contact')
const Chat = require('../models/Chat')

const getChat = asyncHandler(async(req, res) => {
  Message.find(req.query.contactNameMsg ? {'contactNameMsg':  req.query.contactNameMsg  } : {}) 
    .populate('chats', '-_id -__v') 
    .then(messages => res.json(messages));
})

const getContacts = asyncHandler(async(req, res) => {
  Contact.find()
  .select("contactName")
  .then(messages => res.json(messages));
})

const addContact = asyncHandler(async  (req,res) => {
  
  const { contactName } = req.body;

  const newContact = new Contact({
    contactName
  })
  
  newContact.save().then(res.json("Contact Added"))
  
})

const sendChat = asyncHandler(async  (req,res) => {
  
  const { contactNameMsg, chat } = req.body;
  
  const newChat = new Chat({
    chat
  })
  
  newChat.save()
  
  const newMessage = new Message({
      contactNameMsg,
      chats: newChat
  });

  newMessage.save().then(item => res.json("Message Sent"))
})



const deleteChat = asyncHandler(async  (req,res) => {
  Message.findById(req.params.id)
    .then(message => message.remove().then(() => res.json({success:true}) ))
    .catch(err => res.status(404).json( {success:false} )) 
})

module.exports = {
  getContacts,
  addContact,
  sendChat,
  deleteChat,
  getChat

};