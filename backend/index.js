import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();
app.use(cors({
    origin: 'https://neon-torte-02c367.netlify.app'
}));
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/", contactRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
