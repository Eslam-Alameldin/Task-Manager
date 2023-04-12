const express = require("express");
const tasksRoute = require("./routes/tasks");
const notFound = require("./middleware/notFound");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/errorHandler");

const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", tasksRoute);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
