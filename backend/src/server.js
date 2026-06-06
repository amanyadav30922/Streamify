import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']); // Google DNS

// then your imports, dotenv, and mongoose connect

import express from 'express';
import "dotenv/config";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/auth.route.js'; // Adjust the path as necessary
import userRoutes from './routes/user.route.js'; // Adjust the path as necessary
import chatRoutes from './routes/chat.route.js'; // Adjust the path as necessary
import {connectDB} from './lib/db.js'; // Adjust the path as necessary
const app = express();
const PORT = process.env.PORT

const __dirname = path.resolve();


app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/chat",chatRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});