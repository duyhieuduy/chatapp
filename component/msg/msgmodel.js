const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const msgSchema = new Schema({
    id: { type: ObjectId },
    from: { type: ObjectId, ref: 'user' },
    content: { type: String }
});


module.exports = mongoose.model('msg', msgSchema)



