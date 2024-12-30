import express from "express";
import "./config/dbconnection.js";
import userRoute from "./routes/user.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import serviceRoute from "./routes/service/serviceHero.js"
import serviceCarouselRoute from "./routes/service/serviceCarousel.js"
import serviceTimelineRoute from "./routes/service/serviceTimeline.js"
import testimonialsRoute from "./routes/service/testimonials.js"
import allServiceRoute from "./routes/Home/allservice.js"
import hiringRoute from "./routes/Hiring/Hiring.js"
import NewworkerRoute from "./routes/Hiring/Worker.js"
import AddressRoute from './routes/address.js'
import CityRoute from './routes/city.js';
import ServiceDataRoute from './routes/service_data.js';
import SubscriptionPlanDataRoute from './routes/subscriptionplan.js';
import UserSubscriptionDataRoute from './routes/usersubscription.js';
import PaymentRoute from './routes/payment.js'
import BookingDataRoute from './routes/bookingdata.js'
import TeamMemberRoute from './routes/aboutus.js'



const app = express();
const port = "8084";

app.use("/Helpify-backend", express.static("Helpify-backend"));

// Add raw body logging middleware
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
//middleware for uploads
app.use('/uploads', express.static(join(__dirname, 'uploads')));

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
app.use('/services', serviceRoute);
app.use('/serviceCarousel',serviceCarouselRoute);
app.use('/serviceTimeline',serviceTimelineRoute);
app.use('/testimonials',testimonialsRoute);
app.use('/allServices',allServiceRoute);
app.use('/newworkers', NewworkerRoute);
app.use('/hiring', hiringRoute);
app.use("/address" , AddressRoute);

app.use("/city" , CityRoute);

app.use("/servicedata", ServiceDataRoute);

app.use("/subscriptionplandata",SubscriptionPlanDataRoute);

app.use("/usersubscription",UserSubscriptionDataRoute);

app.use('/create-order',PaymentRoute);

app.use('/bookingdata',BookingDataRoute);

app.use('/teammember', TeamMemberRoute);



app.listen(port, () => {
  console.log("The server is running on port: ", port);
});