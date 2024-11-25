import express from "express";
import "./config/dbconnection.js";
import userRoute from "./routes/user.js";

const app = express();
const port = "8084";

// Add raw body logging middleware
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));

// Add request logging middleware
app.use((req, res, next) => {
  console.log('=== Request Debug Info ===');
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Headers:', req.headers);
  console.log('Raw Body:', req.rawBody);
  console.log('Parsed Body:', req.body);
  console.log('========================');
  next();
});

app.use("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, OPTIONS"
  );
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("hello world again");
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

app.listen(port, () => {
  console.log("The server is running on port: ", port);
});