const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const roomSchema = new Schema({
    id: { type: ObjectId },
    sender: { type: ObjectId, ref: 'user' }, //khoa ngoai
    reader: { type: ObjectId, ref: 'user' }, //khoa ngoai
})

module.exports = mongoose.model('room', roomSchema)



