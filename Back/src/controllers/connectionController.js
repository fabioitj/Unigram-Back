import mongoose from "mongoose";
import connections from "../models/Connection.js";
import users from "../models/User.js";
import { request } from "express";
import { STATUS_CONNECTION } from "../util/Constants.js";
import { getUserByToken } from "../routes/auth.js";


class ConnectionController {

   static get_connections_by_logged_user = (req, res) => {
      const id = getUserByToken(req);

      connections.find({
         $and: [
            {
               $or: [
                  { id_user_requester: id },
                  { id_user_requested: id },
               ],
            },
            { status: 'A' }
         ]
      })
      .populate('id_user_requester',)
      .populate('id_user_requested')
      .exec((err, connections) => {
         if(err)
            res.status(500).send({message: err.message});
         else
         {
            res.status(200).send(connections);
         }
            
      });
   }

   static get_pending_connections_by_logged_user = (req, res) => {
      const id = getUserByToken(req);

      connections.find({
         $and: [
            {
               $or: [
                  { id_user_requester: id },
                  { id_user_requested: id },
               ],
            },
            { status: 'R' }
         ]
      })
      .populate('id_user_requester',)
      .populate('id_user_requested')
      .exec((err, connections) => {
         if(err)
            res.status(500).send({message: err.message});
         else
         {
            res.status(200).send(connections);
         }
            
      });
   }

   static get_connections_by_user = (req, res) => {
      const {id} = req.params;

      connections.find({
         $and: [
            {
               $or: [
                  { id_user_requester: id },
                  { id_user_requested: id },
               ],
            },
            { status: 'A' }
         ]
      })
      .populate('id_user_requester',)
      .populate('id_user_requested')
      .exec((err, connections) => {
         if(err)
            res.status(500).send({message: err.message});
         else
         {
            res.status(200).send(connections);
         }
            
      });
   }

   static request_connection = (req, res) => {

      const {id_user_requested} = req.body;

      const id_user_requester = getUserByToken(req);

      const connection = {
         status: STATUS_CONNECTION.REQUESTED,
         id_user_requester: id_user_requester,
         id_user_requested: id_user_requested,
      };

      const new_connection = new connections(connection);
      new_connection.save((err) => {
         if(err)
         {
            res.status(500).send({message: err.message});
            return;
         }
         else 
         {
            res.status(200).send(new_connection.toJSON());
         }
      })
   }

   static accept_connection = (req, res) => {
      const {id_connection} = req.body;

      connections.findByIdAndUpdate(id_connection, { status: STATUS_CONNECTION.ACCEPTED }, (err) => {
         if(err)
            res.status(500).send({message: err.message});
         else
            res.status(200).send({id_connection});
      })
   }

   static deny_connection = (req, res) => {
      const {id_connection} = req.body;

      connections.findByIdAndUpdate(id_connection, { status: STATUS_CONNECTION.DENIED }, (err) => {
         if(err)
            res.status(500).send({message: err.message});
         else
            res.status(200).send({id_connection});
      })
   }

   static block_connection = (req, res) => {
      const {id_connection} = req.body;

      connections.findByIdAndUpdate(id_connection, { status: STATUS_CONNECTION.BLOCKED }, (err) => {
         if(err)
            res.status(500).send({message: err.message});
         else
            res.status(200).send({id_connection});
      })
   }

   static delete_connection = (req, res) => {
      const {id_connection} = req.body;

      connections.findByIdAndDelete(id_connection, (err) => {
         if(err)
            res.status(500).send({message: err.message});
         else
            res.status(200).send({id_connection});
      })
   }
}

export default ConnectionController;