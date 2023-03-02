import aulas from "../models/Aula.js";


class AulasController {
    
    static listarAulasPorModulo = (req, res) => {
        const { id } = req.params;
        aulas
            .find({ idModulo: id })
            .exec((err, aulas) => {
                if(err){
                    Error.addError(err);
                    res.status(500).send({error: Error.getErrors()});
                }
                else
                    res.status(200).send(aulas);
            });
    }

    static inserirAulaPorModulo = (req, res) => {
        const { body } = req;
        console.log(body);

        const aula = new aulas(body);
        aula.save((err) => {
            if(err){
                Error.addError(err);
                res.status(500).send({error: Error.getErrors()});
            }
            else
                res.status(200).send(aula.toJSON());
        });
    }

    static alterarAulaPorModulo = (req, res) => {
        const {id} = req.params;

        aulas.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(err) {
                Error.addError(err);
                res.status(500).send({error: Error.getErrors()});
            } 
            else {
                aulas
                    .findById(id)
                    .exec((err, aula) => {
                        if(err) {
                            res.status(500).send({error: err.message});
                        }
                        else {
                            res.status(200).send(aula);
                        }
                    })
            }
        })
    }

    static removerAulaPorModulo = (req, res) => {
        const {id} = req.params;
        aulas.findByIdAndDelete(id, (err) => {
            if(err) {
                Error.addError(err);
                res.status(500).send({error: Error.getErrors()});
            }
            else {
                res.status(200).send(id);
            }
        });
    }

    static getAulaById = (req, res) => {
        const {id} = req.params;
        aulas.findById(id, (err, aula) => {
            if(err) {
                res.status(500).send({error: error.message});
            }
            else {
                res.status(200).send(aula);
            }
        })
    }
}

export default AulasController;