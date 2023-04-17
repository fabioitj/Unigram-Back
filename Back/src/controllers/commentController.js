import mongoose from "mongoose";
import comments from "../models/Comments.js";


class CommentController {
    
    static get_comments_by_publication = (req, res) => {
        const { id } = req.params;

        comments.find({id_publication: id}, (err, comments_list) => {
            if(err) {
                res.status(500).send({message: err});
            }
            else {
                console.log(comments_list);
                res.status(200).send(comments_list);
            }
        })
    }

    static create_comment = (req, res) => {
        const {body} = req;

        const new_comment = new comments(body);
        new_comment.save((err) => {
            if(err) {
                res.status(500).send({message: err});
            }
            else {
                res.status(200).send(new_comment.toJSON());
            }
        })
    }

    static update_comment = (req, res) => {
        const {body} = req;
        const {id} = req.params;

        comments.findByIdAndUpdate(id, { $set: body }, (err) => {
            if(err) {
                res.status(500).send({message: err});
            }
            else {
                res.status(200).send(id);
            }
        })
    }

    static delete_comment = (req, res) => {
        const {id} = req.params;

        comments.findByIdAndDelete(id, (err) => {
            if(err) {
                res.status(500).send({message: err});
            }
            else {
                res.status(200).send(id);
            }
        })
    }
}

export default CommentController;