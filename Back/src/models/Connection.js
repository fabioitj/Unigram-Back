import mongoose from "mongoose";

const connectionSchema = mongoose.Schema(
    {
        id: {type: String},
        status: {type: String, required: true}, 
        id_user_requester: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users'},
        id_user_requested: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users'}
    },
    {
        versionKey: false
    }
);

const connections = mongoose.model('connections', connectionSchema);

export default connections;