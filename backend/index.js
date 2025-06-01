const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");

const User = require("./routes/user");
const business = require("./routes/labels/business");
const tech = require("./routes/labels/tech");
const entertaiment = require("./routes/labels/entertaiment");
const politics = require("./routes/labels/politics");

dotenv.config();
const app = express();

// Hàm migrate
async function migrateViralField() {
  try {
    const result = await mongoose.connection.db
      .collection("entertainment")
      .updateMany({ viral: { $type: "string" } }, [
        {
          $set: {
            viral: {
              $dateFromString: {
                dateString: "$viral",
                format: "%Y-%m-%d",
                onError: null, // Xử lý lỗi
                onNull: null, // Xử lý giá trị null
              },
            },
          },
        },
      ]);
    console.log(`✅ Đã chuyển đổi ${result.modifiedCount} documents`);
  } catch (error) {
    console.error("❌ Lỗi khi chuyển đổi:", error.message);
  }
}

// Kết nối DB và chạy migrate
const connectAndMigrate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("📚 Đã kết nối MongoDB");

    // Chạy migration sau khi kết nối
    await migrateViralField();
  } catch (error) {
    console.error("❌ Lỗi kết nối MongoDB:", error.message);
    process.exit(1); // Thoát nếu không kết nối được
  }
};

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/v1/auth", authRoute);
app.use("/v1/users", User);
app.use("/v1", business);
app.use("/v1", tech);
app.use("/v1", entertaiment);
app.use("/v1", politics);

// Khởi động server
const startServer = async () => {
  await connectAndMigrate();

  app.listen(8000, () => {
    console.log("🚀 Server đang chạy trên port 8000");
  });
};

startServer();
