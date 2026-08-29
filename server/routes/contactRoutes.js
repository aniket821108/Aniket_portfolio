const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { submitContact, getContacts } = require('../controllers/contactController');

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 200 }),
  body('message').trim().isLength({ min: 20, max: 2000 }).withMessage('Message must be 20–2000 characters'),
];

// Simple API key guard for admin-only routes
const adminAuth = (req, res, next) => {
  const key = req.headers['x-admin-key'];
  if (!process.env.ADMIN_API_KEY || key !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
};

router.post('/', contactValidation, submitContact);
router.get('/', adminAuth, getContacts);

module.exports = router;
