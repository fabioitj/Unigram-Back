import mongoose from "mongoose";

const modeloschema = mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true},
        id_marca: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "marcas"}
    },
    {
        versionKey: false
    }
);

const modelos = mongoose.model('modelo', modeloschema);

export default modelos;