
const express = require("express");
const router = express.Router();
const Email = require("../models/email");
const verifyToken = require("../middleware/authMiddleware");

// @route POST /api/email/send
router.post("/send", verifyToken, async (req, res) => {
  try {
    const { receiver, subject, message } = req.body;

    if (!receiver || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newEmail = new Email({
      sender: req.user.email,
      receiver,
      subject,
      message,
    });

    await newEmail.save();

    res.status(201).json(newEmail);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// @route GET /api/email/inbox
router.get("/inbox", verifyToken, async (req, res) => {
  try {
    const inboxEmails = await Email.find({ receiver: req.user.email }).sort({ createdAt: -1 });
    res.status(200).json(inboxEmails); // ← returning a raw array
  } catch (error) {
    console.error("Error fetching inbox emails:", error);
    res.status(500).json({ error: "Failed to fetch inbox emails" });
  }
});

// @route GET /api/email/sent
router.get("/sent", verifyToken, async (req, res) => {
  try {
    const sentEmails = await Email.find({ sender: req.user.email }).sort({ createdAt: -1 });
    res.status(200).json(sentEmails); // ← returning a raw array
  } catch (error) {
    console.error("Error fetching sent emails:", error);
    res.status(500).json({ error: "Failed to fetch sent emails" });
  }
});

module.exports = router;