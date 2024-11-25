import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.JWT_SECRET || 'your-secret-key-here';

const verifyToken = (req, res, next) => {
  const authToken = req.get("Authorization");
  let decodedAuthToken;
  try {
    decodedAuthToken = jwt.verify(authToken, secretKey);
    req.emailFromAuthToken = decodedAuthToken.email;
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid credentials" });
  }
  console.log("The decodedAuthToken is: ", decodedAuthToken);
};

export { verifyToken };