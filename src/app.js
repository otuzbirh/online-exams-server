require('express-async-errors');

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const aiRoutes = require("./routes/aiRoutes");


const cookieParser = require("cookie-parser");
const connectDB = require("./db/connect")
require('dotenv').config();

const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const app = express();

app.use(express.static('./public'));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/quiz", teacherRoutes);
app.use("/api/v1/score", studentRoutes);
app.use("/api/v1/ai", aiRoutes);

app.use(notFound);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000;
const start = async () => {
  try {
    // Check if MONGO_URL is provided
    if (!process.env.MONGO_URL) {
      console.error('MONGO_URL environment variable is not set');
      process.exit(1);
    }

    await connectDB(process.env.MONGO_URL);
    console.log('Connected to database successfully');

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Only start the server if this file is being run directly (not during build)
if (require.main === module) {
  start();
}





