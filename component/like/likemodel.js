const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const likeSchema = new Schema({
    id: { type: ObjectId },
    user: { type: String, ref: 'user' },
    post: { type: Number, ref: 'post' },
})

module.exports = mongoose.model('like', likeSchema)



