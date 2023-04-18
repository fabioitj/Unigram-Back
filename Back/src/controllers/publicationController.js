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
                [
                    {
                        path: 'id_user', 
                        select: ['name', 'username', 'email', 'birth_date']
                    },
                    {
                        path: 'likes'
                    }
                ],
                (err, result) => {
                    if(err) {
                        res.status(500).send({message: err});
                    } else {
                        res.status(200).send(result);
                    }
                }
            );
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

    static like_publication = async (req, res) => {
        const {id} = req.params;
        const {id_user} = req.body;

        const publication = await publications.findById(id);
        const already_liked = publication.likes.includes(new mongoose.Types.ObjectId(id_user));
        if(already_liked) {
            res.status(500).send({message: "Already liked the publication."});
            return;
        }

        const current = await current_likes_in_publication(id);
        const new_likes = [...(current.filter(c => c != null)), id_user];

        publications.findByIdAndUpdate(id, { likes: new_likes }, (err) => {
            if(err) {
                res.status(500).send({message: err});
            }
            else {
                res.status(200).send({id_user});
            }
        });
    }

    static unlike_publication = async (req, res) => {
        const {id} = req.params;
        const {id_user} = req.body;

        const current = await current_likes_in_publication(id);
        const new_likes = [...(current.filter(c => c != null && c != id_user))];

        publications.findByIdAndUpdate(id, { likes: new_likes }, (err) => {
            if(err) {
                res.status(500).send({message: err});
            }
            else {
                res.status(200).send({id_user});
            }
        });
    }

}

const current_likes_in_publication = async (id) => {
    const publication = await publications.findById(id, 'likes');
    return publication.likes;
}

export default PublicationController;