const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const authRouter = require("./routes/authRoute");
const contactusRoute = require("./routes/contactRoute");
const bulkRoute = require("./routes/bulkRoute");
const blogRoute = require("./routes/blogRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const otpRoute = require("./routes/otproute");
const uploadimageRoute = require("./routes/uploadRoute");
const websiteRoute = require("./routes/websiteRoute");
const adminRoute = require("./routes/adminRoute");
const orderRoute = require("./routes/orderRoute");
const payRoute = require("./routes/paymentRoute");
const couponRoute = require("./routes/couponRoute");
const imageRoute = require("./routes/imageRoute");
const smsRoute = require("./routes/smsRoute");
const reviewsRoute =  require("./routes/reviewRoute")
const shipRocketRoute = require("./routes/shiprocketRoute");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const os = require("os");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const PORT = process.env.PORT || 7021;
dotenv.config();
const app = express();

mongoose.set("strictQuery", true);
dbConnect();
app.use(morgan("dev"));
// Define your allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://kfsecommerce.deepmart.shop",
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Authorization,Content-Type",
  preflightContinue: false,
  optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  exposedHeaders: ["Content-Disposition"]
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
// rate limiting
app.use(helmet()); // Adds various security headers
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per 15 minutes
}));

app.use("/api/user", authRouter);
app.use("/api/cart", cartRoute);
app.use("/api/otp", otpRoute);
app.use("/api/contact", contactusRoute);
app.use("/api/blog", blogRoute);
app.use("/api/bulk", bulkRoute);
app.use("/api/admin", adminRoute);
app.use("/api/config", websiteRoute);
app.use("/api/order", orderRoute);
app.use("/api/payment", payRoute);
app.use("/api/product", productRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/coupon", couponRoute);
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/api/uploads", uploadimageRoute);
app.use("/api/images", imageRoute);
app.use("/api/sms", smsRoute);
app.use("/api/shiprocket",shipRocketRoute)
app.use(express.static("public"));
app.set("views", __dirname + "/public");
app.engine("html", require("ejs").renderFile);

app.get("/about", function (req, res) {
  res.render("dataFrom.html");
});

app.get("/", function(req, res){
  res.render("hello from node server");
})

app.use(notFound);
app.use(errorHandler);



app.listen(PORT ,() => {
  console.log("server is listening on Port :",PORT)
});


