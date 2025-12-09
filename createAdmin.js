const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");

// Correct model paths
const User = require("./app/modules/user/models/user.model");
const Role = require("./app/modules/role/models/role.model");

async function createAdmin() {
  try {
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}?retryWrites=true&w=majority&authSource=admin`;

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB Atlas");

    // 1️⃣ Ensure admin role exists
    let adminRole = await Role.findOne({ role: "admin" });

    if (!adminRole) {
      adminRole = await Role.create({
        roleDisplayName: "Admin",
        role: "admin",
        rolegroup: "backend",
        desc: "System administrator role",
        status: "Active"
      });

      console.log("Admin role created:", adminRole._id);
    } else {
      console.log("Admin role already exists:", adminRole._id);
    }

    // 2️⃣ Hash password
    const hashedPassword = bcrypt.hashSync("Admin@123", bcrypt.genSaltSync(12));

    // 3️⃣ Create admin user
    const adminUser = await User.create({
      fullName: "System Admin",
      email: "admin@sysaving.com",
      password: hashedPassword,
      role: adminRole._id,
      registerType: "Normal",
      isEmailVerified: true,
      status: "Active",
    });

    console.log("Admin user created successfully!");
    console.log("Login Email: admin@sysaving.com");
    console.log("Login Password: Admin@123");

    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();
