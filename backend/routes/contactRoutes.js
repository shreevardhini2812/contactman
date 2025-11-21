import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// Add Contact
router.post("/", async (req, res) => {
  const { name, phone, email } = req.body;
  const contact = await Contact.create({ name, phone, email });
  res.json(contact);
});

// Get All Contacts
router.get("/", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

// Search Contacts (name or phone)
router.get("/search/:key", async (req, res) => {
  const key = req.params.key;
  const contacts = await Contact.find({
    $or: [
      { name: { $regex: key, $options: "i" } },
      { phone: { $regex: key, $options: "i" } }
    ]
  });
  res.json(contacts);
});

// Update Contact
router.put("/:id", async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Delete Contact
router.delete("/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Contact deleted" });
});

export default router;
