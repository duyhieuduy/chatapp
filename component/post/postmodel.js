const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const PostSchema = new Schema({
    id: { type: ObjectId },
    content: { type: String },
    createAt: { type: Date },
    user: { type: ObjectId, ref: 'user' }, //khoa ngoai
    image: { type: String },
    likecount: { type: Number },
    hastag: { type: String }

})

module.exports = mongoose.model('post', PostSchema)



