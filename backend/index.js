const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const authRoute = require("./routes/auth");

const User = require("./routes/user");
const middlewareController = require("./controllers/middleware");
const business = require("./routes/labels/business");
const tech = require("./routes/labels/tech");
const entertaiment = require("./routes/labels/entertaiment");
const politics = require("./routes/labels/politics");
dotenv.config();
const app = express();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
};

// Gọi hàm kết nối
connectToDB();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/v1/auth", authRoute);

app.use("/v1/users", User);

app.use("/v1", business);
app.use("/v1", tech);
app.use("/v1", entertaiment);
app.use("/v1", politics);
app.listen(8000, () => {
  console.log("listening on");
});
