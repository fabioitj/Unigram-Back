import mongoose from "mongoose";

const publicationSchema = mongoose.Schema(
    {
        id: {type: String},
        description: {type: String, required: true},
        image: {type: String, required: true},
        date_register: {type: String, required: true},
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
        id_user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users'},
    },
    {
        versionKey: false
    }
);

const publications = mongoose.model('publications', publicationSchema);

export default publications;