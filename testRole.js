const mongoose = require("mongoose");
require("dotenv").config();

async function test() {
  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}` +
              `@${process.env.DB_HOST}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;

  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  const Role = require("./app/modules/role/models/role.model");

  const role = await Role.findOne({ role: "admin" });

  console.log("ROLE FOUND:", role);
  process.exit();
}

test();
