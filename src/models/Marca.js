import mongoose from "mongoose";

const marcaschema = mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true}
    },
    {
        versionKey: false
    }
);

const marcas = mongoose.model('marca', marcaschema);

export default marcas;