const { MongoClient, ServerApiVersion } = require('mongodb');

require("dotenv").config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

const connectDB = async () => {
    try {
        await client.connect();
        db = client.db('restaurant')
        console.log('MongoDB connected successfully');
    }catch (error) {
        console.log('MongoDB connection error:', error);
    }
}

const getDB = () => {
    if(!db){
        throw new Error('Database Connection Error');
    }
    return db;
}

module.exports = {connectDB, getDB};