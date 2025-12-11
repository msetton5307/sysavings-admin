#!/usr/bin/env node

// Seed or update a default frontend user account for testing the mobile/web flows.
require('dotenv').config();
const { join, resolve } = require('path');
require('app-module-path').addPath(join(__dirname, '..', 'app', 'modules'));

global.config = require(resolve(join(__dirname, '..', 'app/config')));

const connectDb = require('../app/config/database');
const Role = require('role/models/role.model');
const User = require('user/models/user.model');

const USER_EMAIL = (process.env.SEED_USER_EMAIL || 'user@example.com').toLowerCase().trim();
const USER_PASSWORD = process.env.SEED_USER_PASSWORD || 'User@123!';
const USER_NAME = process.env.SEED_USER_NAME || 'Demo User';

(async () => {
  try {
    await connectDb();

    const role = await Role.findOneAndUpdate(
      { role: 'user', rolegroup: 'frontend' },
      {
        roleDisplayName: 'User',
        role: 'user',
        rolegroup: 'frontend',
        status: 'Active',
        isDeleted: false
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    let user = await User.findOne({ email: USER_EMAIL });

    if (!user) {
      user = new User({
        fullName: USER_NAME,
        email: USER_EMAIL,
        role: role._id,
        status: 'Active',
        isDeleted: false,
        isEmailVerified: true,
        registerType: 'Normal'
      });
      user.password = user.generateHash(USER_PASSWORD);
      await user.save();
      console.log(`User created: ${USER_EMAIL}`);
    } else {
      const hashed = user.generateHash(USER_PASSWORD);
      const update = {
        fullName: USER_NAME,
        status: 'Active',
        isDeleted: false,
        isEmailVerified: true,
        registerType: 'Normal',
        role: role._id,
        password: hashed
      };
      await User.findByIdAndUpdate(user._id, update, { new: true });
      console.log(`User updated: ${USER_EMAIL}`);
    }

    console.log('Login with:');
    console.log(`  Email: ${USER_EMAIL}`);
    console.log(`  Password: ${USER_PASSWORD}`);
    process.exit(0);
  } catch (err) {
    console.error('Failed to seed user:', err);
    process.exit(1);
  }
})();
