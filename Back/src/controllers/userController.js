import mongoose from "mongoose";
import users from "../models/User.js";


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
                res.status(200).send(user);
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
        const {id} = req.params;

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
        const {id} = req.params;

        users.findByIdAndDelete(id, (err) => {
            if(err) {
                res.status(500).send({message: err});
            }
            else {
                res.status(200).send(id);
            }
        })
    }

    static follow_user = async (req, res) => {
        const {id} = req.params;
        const {follow} = req.body;

        const user = await users.findById(id);
        const already_follow = user.follows.includes(new mongoose.Types.ObjectId(follow));
        if(already_follow) {
            res.status(500).send({message: "You already follow this account."});
            return;
        }

        const current = await current_follows(id);
        const new_follows = [...current, follow];

        users.findByIdAndUpdate(id, { follows: new_follows }, (err) => {
            if(err) {
                res.status(500).send({message: err});
            }
            else {
                res.status(200).send({follow});
            }
        });
    }

    static unfollow_user = async (req, res) => {
        const {id} = req.params;
        const {follow} = req.body;

        const user = await users.findById(id);
        const dont_follow = !user.follows.includes(new mongoose.Types.ObjectId(follow));
        if(dont_follow) {
            res.status(500).send({message: "You don't follow this account."});
            return;
        }

        const current = await current_follows(id);
        current.splice(current.indexOf(follow), 1);

        users.findByIdAndUpdate(id, { follows: current }, (err) => {
            if(err) {
                res.status(500).send({message: err});
            }
            else {
                res.status(200).send({follow});
            }
        });
    }
}

const current_follows = async (id) => {
    const user = await users.findById(id, 'follows');
    return user.follows;
}

export default UserController;