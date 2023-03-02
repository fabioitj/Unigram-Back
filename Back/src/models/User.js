import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        id: {type: String},
        name: {type: String, required: true},
        email: {type: String, required: true},
        birth_date: {type: String, required: true},
        password: {type: String, required: true},
        follows: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
    },
    {
        versionKey: false
    }
);

const users = mongoose.model('users', userSchema);

export default users;