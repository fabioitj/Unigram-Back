import mongoose from "mongoose";
import messages from "../models/Message.js";
import { request } from "express";
import { getUserByToken } from "../routes/auth.js";

class MessageController {

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