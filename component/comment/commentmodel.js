const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const commentSchema = new Schema({
    id: { type: ObjectId },
    user: { type: ObjectId, ref: 'user' },
    post: { type: ObjectId, ref: 'post' },
    content: { type: String }
})

module.exports = mongoose.model('comment', commentSchema)





