const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: [true, 'Provide a user ID']
    },
    title: {
        type: String,
        required: [true, "you should type the title"],
        maxlength: [40, "the title should not be more than 40 caractere "]
    },
    description: {
        type: String,
        required: true,
        maxlength: [200, "the description should not be more than 40 caractere "]
    },
    color:{
        type: String,
        default: "#ffffff"
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Note", noteSchema);
