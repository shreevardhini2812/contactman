import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import contactRoutes from "./routes/contactRoutes.js";
import Contact from "./models/Contact.js";

dotenv.config();

const app = express();
app.use(cors({
    origin: 'https://neon-torte-02c367.netlify.app'
}));
app.use(express.json());

// DB
connectDB();

// POST new contact
app.post('/contacts', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all contacts
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a contact by ID
app.put('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const contact = await Contact.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true } // return updated document
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(contact);
  } catch (err) {
    console.error('Error updating contact:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// DELETE a contact by ID
app.delete('/contacts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted successfully', contact });
  } catch (err) {
    console.error('Error deleting contact:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Routes
app.use("/", contactRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
