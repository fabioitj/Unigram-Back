import mongoose from "mongoose";
import marcas from "../models/Marca.js"

class MarcaController {

    static add = (req, res) => {
        const {body} = req;
        const new_marca = new marcas(body);

        new_marca.save((err) => {
            if(err)
                res.status(500).send(false);
            else
                res.status(200).send(true);
        });
    }

    static edit = (req, res) => {
        const {body} = req;
        const {id} = req.params;

        marcas.findByIdAndUpdate(id, { $set: body }, (err) => {
            if(err) {
                res.status(500).send(false);
            }
            else {
                res.status(200).send(true);
            }
        });
    }

    static delete = (req, res) => {
        const {id} = req.params;

        marcas.findByIdAndDelete(id, (err) => {
            if(err)
                res.status(500).send(false);
            else
                res.status(200).send(true);
        });
    }

    static getById = (req, res) => {
        const {id} = req.params;

        marcas.findById(id, (err, marca) => {
            if(err)
                res.status(500).send(null);
            else
                res.status(200).send(marca);
        });
    }
    
    static getAll = (req, res) => {
        marcas.find((err, marcas) => {
            if(err)
                res.status(500).send([]);
            else
                res.status(200).send(marcas);
        });
    }
}

export default MarcaController;