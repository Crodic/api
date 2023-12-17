const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const Connection = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connection successfully !!!');
    } catch (error) {
        console.log('Connection Fail with error: ', error.message);
    }
};

module.exports = Connection;
