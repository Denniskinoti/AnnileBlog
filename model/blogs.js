const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title :String,
    content: String,
    photo:String
})

module.exports = mongoose.model('blog',blogSchema)