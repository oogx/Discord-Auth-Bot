const mongoose = require('mongoose');
const { User, Password, ClusterName } = require('../Misc/Mongo.json');
module.exports = (client) => {
    mongoose.connect(`mongodb+srv://${User}:${Password}@server.${ClusterName}.mongodb.net/Data`);
    mongoose.Promise = global.Promise;
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connection successfully opened!');
    });
    mongoose.connection.on('err', err => {
        console.error(`Mongoose connection error: \n ${err.stack}`);
    });
    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection disconnected');
    });
}