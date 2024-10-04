const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/user');

router.post(`/`, async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password),
    phone: req.body.phone,
    street: req.body.street,
    apartment: req.body.apartment,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    isAdmin: req.body.isAdmin,
  });

  const createdUser = await user.save();
  if (!createdUser) {
    res.status(500).json({
      success: false,
      error: `User not Created`,
    });
  } else {
    res.status(201).json(createdUser);
  }
});

router.get(`/`, async (req, res) => {
  const userList = await User.find({}).select('-passwordHash');
  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

router.get('/:id', async (req, res) => {
  const userID = req.params.id;
  const user = await User.findById(userID).select('-passwordHash');

  if (!user) {
    return res.status(404).json({ success: false, message: 'User Not Found' });
  } else {
    return res.json(user);
  }
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.secret;
  if (!user) {
    return res.status(400).send('The User not found');
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    console.log(`Login Admin :- ${user.isAdmin}`);

    const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, secret, {
      expiresIn: '1d',
    });

    res
      .status(200)
      .send({ success: true, token: token, message: 'User Authenticated' });
  } else {
    res.status(400).send('Password is Wrong!');
  }
});

router.get('/get/count', async (req, res) => {
  const userCount = await User.countDocuments();

  if (!userCount) {
    res.status(500).json({ success: false });
  } else {
    res.json({ userCount: userCount });
  }
});

router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (user) {
        return res
          .status(200)
          .json({ success: true, message: 'The User Deleted' });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'The User Not Found' });
      }
    })
    .catch((error) => {
      return res.status(500).json({ success: false, message: error });
    });
});

module.exports = router;
