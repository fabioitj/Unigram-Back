import mongoose from "mongoose";
import modelos from "../models/Modelo.js"

class ModeloController {

    static add = (req, res) => {
        const {body} = req;
        const new_modelo = new modelos(body);

        new_modelo.save((err) => {
            if(err)
                res.status(500).send(false);
            else
                res.status(200).send(true);
        });
    }

    static edit = (req, res) => {
        const {body} = req;
        const {id} = req.params;

        modelos.findByIdAndUpdate(id, { $set: body }, (err) => {
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

        modelos.findByIdAndDelete(id, (err) => {
            if(err)
                res.status(500).send(false);
            else
                res.status(200).send(true);
        });
    }

    static getById = (req, res) => {
        const {id} = req.params;

        modelos.findById(id, (err, modelo) => {
            if(err)
                res.status(500).send(null);
            else
                res.status(200).send(modelo);
        });
    }
    
    static getAll = (req, res) => {
        modelos.find((err, modelos) => {
            if(err)
                res.status(500).send([]);
            else
                res.status(200).send(modelos);
        });
    }
}

export default ModeloController;