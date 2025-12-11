#!/usr/bin/env node

// Seed or update a backend admin user for local development.
require('dotenv').config();
const { join, resolve } = require('path');
require('app-module-path').addPath(join(__dirname, '..', 'app', 'modules'));

// Expose config globally because some model helpers (e.g., password hashing)
// expect it on the global object.
global.config = require(resolve(join(__dirname, '..', 'app/config')));

const connectDb = require('../app/config/database');
const Role = require('role/models/role.model');
const User = require('user/models/user.model');

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase().trim();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@123!';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Local Admin';

(async () => {
  try {
    await connectDb();

    const role = await Role.findOneAndUpdate(
      { role: 'admin', rolegroup: 'backend' },
      {
        roleDisplayName: 'Admin',
        role: 'admin',
        rolegroup: 'backend',
        status: 'Active',
        isDeleted: false
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    let user = await User.findOne({ email: ADMIN_EMAIL });

    if (!user) {
      user = new User({
        fullName: ADMIN_NAME,
        email: ADMIN_EMAIL,
        role: role._id,
        status: 'Active',
        isDeleted: false
      });
      user.password = user.generateHash(ADMIN_PASSWORD);
      await user.save();
      console.log(`Admin user created: ${ADMIN_EMAIL}`);
    } else {
      const hashed = user.generateHash(ADMIN_PASSWORD);
      const update = {
        fullName: ADMIN_NAME,
        status: 'Active',
        isDeleted: false,
        role: role._id,
        password: hashed
      };
      await User.findByIdAndUpdate(user._id, update, { new: true });
      console.log(`Admin user updated: ${ADMIN_EMAIL}`);
    }

    console.log('Login with:');
    console.log(`  Email: ${ADMIN_EMAIL}`);
    console.log(`  Password: ${ADMIN_PASSWORD}`);
    process.exit(0);
  } catch (err) {
    console.error('Failed to seed admin user:', err);
    process.exit(1);
  }
})();
