const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema ({
  contactName: {
    type:String,
    // required: true
  }
});

const Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact