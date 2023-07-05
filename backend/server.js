require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const projectRoutes = require("./routes/projects");
const userRoutes = require("./routes/user");

//express app
const app = express();

//middleware
app.use(
  cors({ origin: ["https://worklab-frontend.vercel.app/"], methods:["POST", "GET","DELETE", "PUT", "PATCH"], credentials: true })
);
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/projects/", projectRoutes);
app.use("/api/user/", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port");
    });
  })
  .catch((error) => {
    console.log(error);
  });
