const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
  title:{type: String},
  author:{type: String},
  publicationYear:{type:Number}
},{timestamps:true})

module.exports = mongoose.model('Book', bookSchema)