const mongoose = require("mongoose");

const connectionDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB);
    console.log("Connection done ");
    return connect;
  } catch (error) {
    console.log("Unable to connect", error.message);
  }
};

module.exports = connectionDB;
