import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decode.userId).select("-password");
      next();
    } catch (error) {
      console.log("error on the middleware");

      res.status(401).json({
        Error: "Not authorized,invalid token",
      });
    }
  } else {
    res.status(401).json({
      Error: "Not authorized ,no token",
    });
  }
};
