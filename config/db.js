const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connnectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(db, {
        });

        console.log("MongoDB connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connnectDB;