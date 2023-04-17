import mongoose from "mongoose";
import publications from "../models/Publication.js";
import { request } from "express";


class PublicationController {
    
    static get_publications_by_user = async (req, res) => {
        const { id } = req.params;

        const publication_list = await publications
            .aggregate([
                {
                    $match: {
                        id_user: new mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: "comments", // collection name in db
                        localField: "_id",
                        foreignField: "id_publication",
                        as: "comments"
                    }
                }
            ])
            
        publications
            .populate(
                publication_list, 
                {
                    path: 'id_user', 
                    select: ['name', 'username', 'email', 'birth_date']
                },
                (err, result) => {
                    if(err) {
                        res.status(500).send({message: err});
                    } else {
                        res.status(200).send(result);
                    }
                }
            )
    }

    static get_publication_by_id = async (req, res) => {
        const { id } = req.params;

        const publication_list = await publications
            .aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: "comments", // collection name in db
                        localField: "_id",
                        foreignField: "id_publication",
                        as: "comments"
                    }
                }
            ])
            
        publications
            .populate(
                publication_list, 
                {
                    path: 'id_user', 
                    select: ['name', 'username', 'email', 'birth_date']
                },
                (err, result) => {
                    if(err) {
                        res.status(500).send({message: err});
                    } else {
                        res.status(200).send(result);
                    }
                }
            )
    }

    static create_publication = (req, res) => {
        const {body} = req;

        const new_publication = new publications(body);
        new_publication.save((err) => {
            if(err) {
                res.status(500).send({message: err});
            }
            else {
                res.status(200).send(new_publication.toJSON());
            }
        })
    }

    static update_publication = (req, res) => {
        const {body} = req;
        const {id} = req.params;

        publications.findByIdAndUpdate(id, { $set: body }, (err) => {
            if(err) {
                res.status(500).send({message: err});
            }
            else {
                res.status(200).send(id);
            }
        })
    }

    static delete_publication = (req, res) => {
        const {id} = req.params;

        publications.findByIdAndDelete(id, (err) => {
            if(err) {
                res.status(500).send({message: err});
            }
            else {
                res.status(200).send(id);
            }
        })
    }
}

export default PublicationController;