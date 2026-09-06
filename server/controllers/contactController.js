const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');

/**
 * Create a reusable nodemailer transporter.
 * Returns null if SMTP is not configured.
 */
function createTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  const nodemailer = require('nodemailer');
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/**
 * HTML email template for owner notification.
 */
function ownerEmailHtml({ name, email, subject, message, timestamp }) {
  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #0d1117; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06);">
    <div style="background: linear-gradient(135deg, #7c5af0 0%, #22d3ee 100%); padding: 28px 32px;">
      <h1 style="color: #fff; margin: 0; font-size: 20px; font-weight: 600;">📬 New Portfolio Message</h1>
    </div>
    <div style="padding: 28px 32px; color: #f1f5f9;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; width: 90px; vertical-align: top;">From</td>
          <td style="padding: 10px 0; font-size: 15px; font-weight: 500;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; vertical-align: top;">Email</td>
          <td style="padding: 10px 0; font-size: 15px;"><a href="mailto:${email}" style="color: #a78bfa; text-decoration: none;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; vertical-align: top;">Subject</td>
          <td style="padding: 10px 0; font-size: 15px; font-weight: 500;">${subject}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; vertical-align: top;">Time</td>
          <td style="padding: 10px 0; font-size: 13px; color: #94a3b8;">${timestamp}</td>
        </tr>
      </table>
      <div style="margin-top: 20px; padding: 20px; background: #111827; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);">
        <p style="color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0;">Message</p>
        <p style="color: #f1f5f9; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
      </div>
      <p style="margin-top: 24px; font-size: 12px; color: #4b5563;">Reply directly to this email to respond to ${name}.</p>
    </div>
  </div>`;
}

/**
 * HTML email template for visitor confirmation.
 */
function visitorEmailHtml({ name, subject }) {
  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #0d1117; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06);">
    <div style="background: linear-gradient(135deg, #7c5af0 0%, #22d3ee 100%); padding: 28px 32px;">
      <h1 style="color: #fff; margin: 0; font-size: 20px; font-weight: 600;">✅ Message Received!</h1>
    </div>
    <div style="padding: 28px 32px; color: #f1f5f9;">
      <p style="font-size: 16px; line-height: 1.7; margin: 0 0 16px 0;">
        Hi <strong>${name}</strong>,
      </p>
      <p style="font-size: 15px; line-height: 1.7; color: #94a3b8; margin: 0 0 16px 0;">
        Thank you for reaching out! I've received your message regarding <strong style="color: #f1f5f9;">"${subject}"</strong> and will get back to you within <strong style="color: #a78bfa;">24 hours</strong>.
      </p>
      <p style="font-size: 15px; line-height: 1.7; color: #94a3b8; margin: 0 0 24px 0;">
        In the meantime, feel free to check out my work on
        <a href="https://github.com/aniket821108" style="color: #22d3ee; text-decoration: none;">GitHub</a> or connect with me on
        <a href="https://www.linkedin.com/in/aniket-kumar-1225a7284/" style="color: #22d3ee; text-decoration: none;">LinkedIn</a>.
      </p>
      <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px; margin-top: 8px;">
        <p style="font-size: 14px; color: #f1f5f9; margin: 0; font-weight: 500;">Aniket Kumar</p>
        <p style="font-size: 12px; color: #4b5563; margin: 4px 0 0 0;">Full-Stack Developer & ML Engineer</p>
      </div>
    </div>
  </div>`;
}

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
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Send email notifications (non-blocking — DB record is already saved)
    const transporter = createTransporter();
    if (transporter) {
      const ownerEmail = process.env.OWNER_EMAIL || process.env.SMTP_USER;

      // 1. Notify owner
      try {
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
          replyTo: `"${name}" <${email}>`,
          to: ownerEmail,
          subject: `[Portfolio] ${subject} — from ${name}`,
          html: ownerEmailHtml({ name, email, subject, message, timestamp }),
        });
      } catch (mailErr) {
        console.error('Owner email notification failed (non-fatal):', mailErr.message);
      }

      // 2. Confirmation to visitor
      try {
        await transporter.sendMail({
          from: `"Aniket Kumar" <${process.env.SMTP_USER}>`,
          to: email,
          subject: `Re: ${subject} — Message Received!`,
          html: visitorEmailHtml({ name, subject }),
        });
      } catch (mailErr) {
        console.error('Visitor confirmation email failed (non-fatal):', mailErr.message);
      }
    } else {
      console.warn('SMTP not configured — skipping email notifications. Message saved to DB.');
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
