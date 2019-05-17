const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
    title : { type: String, required : true },
    content : { type: String , required : true },
    deadline: { type: Date, required : true },
    priority : { type : String, default : "보통"},
    finish : { type : Boolean, default: false}
});

module.exports = Post = mongoose.model('post', PostSchema);