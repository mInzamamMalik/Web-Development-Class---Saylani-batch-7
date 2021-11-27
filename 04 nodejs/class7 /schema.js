const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        created_on: { type: Date, default: Date.now },
    }
)

const postModel = mongoose.model('posts', PostSchema);

module.exports = postModel;