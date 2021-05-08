import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import connectDB from "./config/db";
import userRoute from "./routes/users";
import showsRoute from "./routes/shows";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Init middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

//routes;
app.use("/user", userRoute);
app.use("/shows", showsRoute);

// Return a message to the browser to show server is up and running
app.get("/", (req: Request, res: Response) =>
  res.send("Webbed Feet server is up and running!")
);

app.listen(PORT, () =>
  console.log(`Webbed Feet server started on port ${PORT}`)
);
