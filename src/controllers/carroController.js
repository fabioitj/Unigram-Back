import mongoose from "mongoose";
import carros from "../models/Carro.js"

class CarroController {

    static add = (req, res) => {
        const {body} = req;
        const new_carro = new carros(body);

        new_carro.save((err) => {
            if(err)
                res.status(500).send(false);
            else
                res.status(200).send(true);
        });
    }

    static edit = (req, res) => {
        const {body} = req;
        const {id} = req.params;

        carros.findByIdAndUpdate(id, { $set: body }, (err) => {
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

        carros.findByIdAndDelete(id, (err) => {
            if(err)
                res.status(500).send(false);
            else
                res.status(200).send(true);
        });
    }

    static getById = (req, res) => {
        const {id} = req.params;

        carros.findById(id, (err, carro) => {
            if(err)
                res.status(500).send(null);
            else
                res.status(200).send(carro);
        });
    }
    
    static getAll = (req, res) => {
        carros.find((err, carros) => {
            if(err)
                res.status(500).send([]);
            else
                res.status(200).send(carros);
        });
    }
}

export default CarroController;