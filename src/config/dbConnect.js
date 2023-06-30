import mongoose from "mongoose";

const connectionString = "mongodb+srv://fridow8:OLsH8JNslqiVCCii@unigram.axisd4g.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString);

let db = mongoose.connection;

export default db;