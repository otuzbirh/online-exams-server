require('express-async-errors');


const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");


const cookieParser = require("cookie-parser");
const connectDB = require("./db/connect")
require('dotenv').config();

const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const app = express();

app.use(express.static('./public'));
app.use(express.json());
app.use(cors());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/quiz", teacherRoutes);
app.use("/api/v1/score", studentRoutes);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();


app.use(cookieParser());



