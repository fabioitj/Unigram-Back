import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        id: {type: String},
        name: {type: String, required: true},
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true},
        birth_date: {type: String, required: true},
        password: {type: String, required: true},
        connections: [{type: mongoose.Schema.Types.ObjectId, ref: 'connections'}]
    },
    {
        versionKey: false
    }
);

const users = mongoose.model('users', userSchema);

export default users;