import mongoose from "mongoose";
import users from "../models/User.js";
import { generateToken, getUserByToken } from "../routes/auth.js";


class UserController {
    
    static login = (req, res) => {
        const { body } = req;

        users.findOne({
            email: body.email,
            password: body.password
        }, (err, user) => {
            if(err || !user) {
                res.status(500).send({message: "Suas credenciais estão incorretas."});
            }
            else {
                const token = generateToken(user._id);

                res.status(200).send({token, userId: user._id, email: user.email});
            }
        })
    }

    static get_users = (req, res) => {
        users.find((err, user_list) => {
            if(err) {
                res.status(500).send({message: err});
            }
            else {
                res.status(200).send(user_list);
            }
        })
    }

    static get_users_by_search = (req, res) => {
        const { search } = req.body;

        users.find({
            'name': { $regex: '.*' + search + '.*' }
        }, (err, users) => {
            if(err)
                res.status(500).send({message: err});
            else
                res.status(200).send(users);
        });
    }

    static get_user_by_id = (req, res) => {
        const {id} = req.params;
        
        users.findById(id, (err, user) => {
            if(err) {
                res.status(500).send({message: err});
            }
            else {
                res.status(200).send(user);
            }
        });
    }

    static create_user = (req, res) => {
        const {body} = req;

        const new_user = new users(body);
        new_user.save((err) => {
            if(err) {
                res.status(500).send({message: err});
            }
            else {
                res.status(200).send(new_user.toJSON());
            }
        })
    }

    static update_user = (req, res) => {
        const {body} = req;
        const id = getUserByToken(req);

        users.findByIdAndUpdate(id, { $set: body }, (err) => {
            if(err) {
                res.status(500).send({message: err});
            }
            else {
                res.status(200).send(id);
            }
        })
    }

    static delete_user = (req, res) => {
        const id = getUserByToken(req);

        users.findByIdAndDelete(id, (err) => {
            if(err) {
                res.status(500).send({message: err});
            }
            else {
                res.status(200).send(id);
            }
        })
    }
}

export default UserController;