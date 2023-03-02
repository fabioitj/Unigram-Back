import mongoose from "mongoose";

const aulachema = mongoose.Schema(
    {
        id: {type: String},
        descricao: {type: String, required: true}
    },
    {
        versionKey: false
    }
);

const aulas = mongoose.model('aula', aulachema);

export default aulas;