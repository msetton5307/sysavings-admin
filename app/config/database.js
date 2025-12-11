const mongoose = require('mongoose');

mongoose.set('strictQuery', false);


module.exports = async () => {
  try {
    let db = await mongoose.connect('mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_DATABASE, {
      auth: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
      }
    });

    global.dbUrl = db.connections[0].db;
    console.log('DB connected successfully');
  } catch (error) {
    console.error(error);
  }
}