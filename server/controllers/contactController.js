const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');

// @desc   Submit contact form
// @route  POST /api/contact
exports.submitContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, email, subject, message } = req.body;
    const contact = await Contact.create({ name, email, subject, message });

    // Optional: send email notification (requires SMTP config in .env)
    if (process.env.SMTP_USER) {
      try {
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          secure: true,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        });
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
          to: process.env.OWNER_EMAIL,
          subject: `[Portfolio] ${subject} — from ${name}`,
          html: `<p><strong>From:</strong> ${name} (${email})</p><p><strong>Subject:</strong> ${subject}</p><p>${message.replace(/\n/g, '<br/>')}</p>`,
        });
      } catch (mailErr) {
        console.warn('Email notification failed (non-fatal):', mailErr.message);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Message received! I will get back to you soon.',
      data: { id: contact._id },
    });
  } catch (error) {
    console.error('Contact submit error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

// @desc   Get all contact messages (admin)
// @route  GET /api/contact
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
