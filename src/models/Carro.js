import mongoose from "mongoose";

const carroschema = mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true},
        renavam: {type: Number, required: true},
        placa: {type: String, required: true},
        valor: {type: Number, required: true},
        ano: {type: String, required: true},
        id_modelo: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'carros'}
    },
    {
        versionKey: false
    }
);

const carros = mongoose.model('carro', carroschema);

export default carros;