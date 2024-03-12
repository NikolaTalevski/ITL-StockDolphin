const mongoose = require("mongoose");
const config = require("../config");

const { username, password, dbname } = config.getSection("db");

const uri = `mongodb+srv://${username}:${password}@cluster0.0hmhh1m.mongodb.net/${dbname}?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(uri);
  } catch (err) {
    console.error(err);
  }
}

connect();
