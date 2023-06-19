import mongoose from "mongoose";
import messages from "../models/Message.js";
import connections from "../models/Connection.js";
import { request } from "express";
import { getUserByToken } from "../routes/auth.js";
import users from "../models/User.js";

class MessageController {

    static get_all_conversations = async (req, res) => {

        const userId = getUserByToken(req);

        try {
            // Find the connections of the user with status 'A'
            const connectionsByUser = await connections.find({
                $and: [
                {
                    $or: [
                    { id_user_requester: userId },
                    { id_user_requested: userId }
                    ]
                },
                { status: 'A' }
                ]
            });
        
            // Extract the connected user IDs
            const connectedUserIds = connectionsByUser.reduce((ids, connection) => {
                if (connection.id_user_requester.toString() !== userId) {
                ids.push(connection.id_user_requester);
                }
                if (connection.id_user_requested.toString() !== userId) {
                ids.push(connection.id_user_requested);
                }
                return ids;
            }, []);
        
            // Find the users with the last exchanged message
            const usersWithLastMessages = await Promise.all(
                connectedUserIds.map(async (connectedUserId) => {
                    console.log({connectedUserId});

                const lastMessage = await messages.findOne({
                    $or: [
                    { sender: userId, receiver: connectedUserId },
                    { sender: connectedUserId, receiver: userId }
                    ]
                })
                    .sort({ date_register: -1 })
                    .limit(1)
                    .populate('sender')
                    .populate('receiver');
                
                if(!lastMessage)
                    return;

                const obj = {
                    userId: connectedUserId,
                    message: {
                    _id: lastMessage?._id,
                    body: lastMessage?.body,
                    sender: lastMessage?.sender._id,
                    receiver: lastMessage?.receiver._id,
                    date_register: lastMessage?.date_register
                    }
                };

                console.log(obj);

                return obj;
                })
            );
                


            // Return the users with last messages
            res.status(200).send(usersWithLastMessages.filter(_ => _ != null));
            } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred' });
            }
    }

    static get_messages = (req, res) => {

        const {receiver} = req.body;

        const sender = getUserByToken(req);

        messages.find({
            $and: [
                {
                   $or: [
                      { receiver: receiver },
                      { sender: receiver },
                   ],
                },
                { 
                    $or: [
                        { receiver: sender},
                        { sender: sender},
                    ]
                }
             ]
        })
        .exec((err, messages) => {
            if(err)
                res.status(500).send({message: err.message});
            else
                res.status(200).send(messages);
        });
    }

    static send_message = (req, res) => {
        
        const sender = getUserByToken(req);

        const newMessage = new messages({
            ...req.body,
            sender,
            date_register: new Date()
        })

        newMessage.save((err) => {
            if(err)
                res.status(500).send({message: err.message});
            else
                res.status(200).send(newMessage.toJSON());
        });
    }

    static delete_message = (req, res) => {

        const {id} = req.params;

        const id_user = getUserByToken(req);

        messages.findById(id, (err, message) => {
            if(err)
                res.status(500).send({message: err.message});
            else {

                if(message.sender !== id_user)
                    res.status(500).send({message: "Este usuário não enviou esta mensagem, portanto, não pode excluí-la"})
                else {
                    messages.findByIdAndDelete(id, (err) => {
                        if(err)
                            res.status(500).send({message: err.message});
                        else
                            res.status(200).send(id);
                    });
                }   
            }
        })
    }

}

export default MessageController;