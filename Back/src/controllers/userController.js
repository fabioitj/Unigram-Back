import mongoose from "mongoose";
import users from "../models/User.js";
import { generateToken, getUserByToken } from "../routes/auth.js";
import connections from "../models/Connection.js";


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

    static get_users_by_search = async (req, res) => {
        const { username } = req.params;
        const currentUser = getUserByToken(req); // Assuming you have the current user object available
    
        try {
            const blockedConnections = await connections.find({
                $and: [
                { $or: [{ id_user_requester: currentUser }, { id_user_requested: currentUser }] },
                { status: 'B' }
                ]
            }).select('id_user_requester id_user_requested');
        
            const blockedUserIds = blockedConnections.reduce((ids, connection) => {
                if (connection.id_user_requester.toString() !== currentUser.toString()) {
                ids.push(connection.id_user_requester);
                }
                if (connection.id_user_requested.toString() !== currentUser.toString()) {
                ids.push(connection.id_user_requested);
                }
                return ids;
            }, []);
        
            const usersFound = await users.find({
                $and: [
                { name: { $regex: '.*' + username + '.*' } },
                { _id: { $nin: blockedUserIds } }
                ]
            }, '_id username name');
        
            res.status(200).json(usersFound);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err });
        }
    }

    static get_user_by_id = async (req, res) => {
        const {id} = req.params;

        const userId = getUserByToken(req);
        
        const user = await users.findById(id).select('-password');
        let connectionIds = await connections.find({
            $or: [
                { id_user_requester: id },
                { id_user_requested: id }
            ]
        });

        const filteredConnection = connectionIds.filter(connectionId => connectionId.id_user_requester.toString() == userId || connectionId.id_user_requested.toString() == userId);
        let connection = null;

        if(filteredConnection.length > 0 && id !== userId)
            connection = {
                _id: filteredConnection[0]._id,
                isConnected: filteredConnection[0].status === 'A',
                isPending: filteredConnection[0].status === 'P',
            }

        const retorno = {
            ...(user.toObject()),
            connections: connectionIds,
            connection
        };

        res.status(200).send(retorno);
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