const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
  title:{type: String},
  author:{type: String},
  publicationYear:{type:String}
},{timestamps:true})

module.exports = mongoose.model('Book', bookSchema)