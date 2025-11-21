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

// Routes
app.use("/", contactRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
