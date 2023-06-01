const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserSchema = new Schema({
    id: { type: ObjectId },
    username: { type: String },
    password: { type: String },
    email: { type: Number },
    avatar: { type: String },
    name: { type: String },
    dob: { type: Date },
    gender: { type: String },
})

module.exports = mongoose.model('user', UserSchema)


