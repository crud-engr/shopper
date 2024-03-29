const mongoose = require('mongoose');
const { NODE_ENV } = process.env;
require('dotenv').config();

let db_url = process.env.LOCAL_DB;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(db_url);
        console.log(`DB Connection successful: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Connection error: ${err.message}`);
    }
};

module.exports = connectDB;
