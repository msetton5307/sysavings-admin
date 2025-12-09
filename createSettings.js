const mongoose = require("mongoose");
require("dotenv").config();

const Settings = require("./app/modules/settings/models/settings.model");

async function createSettings() {
  try {
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}?retryWrites=true&w=majority&authSource=admin`;

    await mongoose.connect(uri);
    console.log("Connected to MongoDB Atlas");

    let settings = await Settings.findOne();

    if (settings) {
      console.log("Settings already exist:");
      console.log(settings);
      return;
    }

    settings = await Settings.create({
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
        lnkdn: "",
      },
      notification: true,
      preferences: true,
      email_notifications: true,
      amountToPayCustomer: 0,
      isDeleted: false,
    });

    console.log("Default settings created:");
    console.log(settings);
  } catch (error) {
    console.error("Error creating settings:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

createSettings();
