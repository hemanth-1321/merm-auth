import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { connectDb } from "./config/DB.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
connectDb();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.send("server is up");
});
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
