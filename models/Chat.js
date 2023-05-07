const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const chatSchema = new Schema({
  chat: {
    type: String,
    required: true
  },
})

const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat