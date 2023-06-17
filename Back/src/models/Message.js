import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
    {
        id: {type: String},
        body: {type: String, required: true},
        sender: {type: mongoose.Schema.Types.ObjectId, required: true},
        receiver: {type: mongoose.Schema.Types.ObjectId, required: true},
        date_register: {type: Date, required: true}
    },
    {
        versionKey: false
    }
);

const messages = mongoose.model('messages', messageSchema);

export default messages;