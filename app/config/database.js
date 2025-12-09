const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

module.exports = async () => {
  try {
    let uri;

    // If using SRV (Atlas)
    if (process.env.DB_CONNECTION === "mongodb+srv") {
      uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
    } 
    // Otherwise use legacy host:port connection
    else {
      uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
    }

    let db = await mongoose.connect(uri);

    global.dbUrl = db.connections[0].db;
    console.log('DB connected successfully');
  } catch (error) {
    console.error("DB connection error:", error);
  }
}
