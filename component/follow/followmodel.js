const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const followSchema = new Schema({
    id: { type: ObjectId },
    follower: { type: ObjectId, ref: 'user' },
    following: { type: ObjectId, ref: 'user' },
})

module.exports = mongoose.model('follow', followSchema)
