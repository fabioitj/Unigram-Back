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
        const username = req.params;

        users.find({
            'name': { $regex: '.*' + username + '.*' }
        }, ['_id', 'username', 'name'], (err, users) => {
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

        const validate_message = validate_signup(body);
        if(validate_message != "")
            return res.status(500).send({message: validate_message});

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

function validate_signup(data) {
    const {username, email, password, confirm_password, birth_date} = data;
    const fields_validate = [];

    if(!username)
        fields_validate.push('Você precisa preencher o campo Username');
    
    if(!email)
        fields_validate.push('Você precisa preencher o campo E-mail');
    
    if(!password)
        fields_validate.push('Você precisa preencher o campo Password');
    else if(password != confirm_password)
            fields_validate.push('A senha e confirmar senha precisam ser idênticas.');

    if(!birth_date)
        fields_validate.push('Você precisa preencher o campo Birth Date');

    return fields_validate.join(', ');
}

export default UserController;