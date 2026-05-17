const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const User = require('../../models/User');

router.get('/profile', verifyToken, async (req, res) => {
  const user = await User.findById(req.user.user_id).select('-password').lean();
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

module.exports = router;