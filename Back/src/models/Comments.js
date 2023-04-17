import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        id: {type: String},
        description: {type: String, required: true},
        comment_date: {type: String, required: true},
        id_publication: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'publications'},
    },
    {
        versionKey: false
    }
);

const comments = mongoose.model('comments', commentSchema);

export default comments;