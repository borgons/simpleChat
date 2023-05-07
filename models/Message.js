const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const messageSchema = new Schema({
  contactNameMsg: {
    type: String
  },
  chats: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat"
  }
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message
