import mongoose from "mongoose";

const publicationSchema = mongoose.Schema(
    {
        id: {type: String},
        description: {type: String, required: true},
        image: {type: String, required: true},
        publication_date: {type: String, required: true},
        id_user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users'},
    },
    {
        versionKey: false
    }
);

const publications = mongoose.model('publications', publicationSchema);

export default publications;