const express = require('express');
const router = express.Router();
const getPaginatedUsers = require('../getPaginatedUsers');
const User = require('../models/user');

router.get('/', async (req, res) => {
  try {
    const { userId, page = 1, pageSize = 20 } = req.query;

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return res.status(404).send('User not found');
    }

    const users = await getPaginatedUsers(req.db, currentUser, parseInt(page), parseInt(pageSize));

    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
