import mongoose from "mongoose";

const connectionString = "mongodb+srv://fabioitj2010:5bP7l4AThjfbDQws@unigram.ncf3fp1.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString);

let db = mongoose.connection;

export default db;