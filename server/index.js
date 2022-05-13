import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";
import logger from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
const app = express();
app.use(cors());
dotenv.config();
app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/posts", postRoutes);

// const CONNECTION_URL =
//   "mongodb+srv://admin:admin@cluster0.zfdny.mongodb.net/memories?retryWrites=true&w=majority";
const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

// moongose.set("useFindAndModify", false);
