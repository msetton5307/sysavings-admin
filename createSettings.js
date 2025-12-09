const mongoose = require("mongoose");
require("dotenv").config();

const Settings = require("./app/modules/settings/models/settings.model");

async function createSettings() {
  try {
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}?retryWrites=true&w=majority&authSource=admin`;

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB Atlas");

    const existing = await Settings.findOne();

    if (existing) {
      console.log("Settings already exist:");
      console.log(existing);
      process.exit();
      return;
    }

    const newSettings = await Settings.create({
      contactNumber: "+1 (555) 123-4567",
      email: "support@sysaving.com",
      address: "New York, USA",
      playstoreURL: "",
      applestoreURL: "",
      time_zone: "UTC",
      commision: 0,
      vat: 0,
      radius: 0,
      socialLinks: {
        fb: "",
        twtr: "",
        insta: "",
        lnkdn: ""
      },
      notification: true,
      preferences: true,
      email_notifications: true,
      amountToPayCustomer: 0,
      isDeleted: false
    });

    console.log("Default settings created:");
    console.log(newSettings);
    process.exit();
  } catch (error) {
    console.error("Error creating settings:", error);
    process.exit(1);
  }
}

createSettings();