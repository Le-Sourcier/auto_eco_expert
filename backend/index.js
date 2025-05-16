import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import db from "./models/index.js";
// import userRoutes from "./routes/user.routes.js";
import leadRoutes from "./routes/lead.routes.js";

// Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
// app.use("/api/auth", userRoutes);
app.use("/api/leads", leadRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Auto Eco Expert API" });
});

// Database connection and server start
const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connection established successfully.");

    // Sync models with database
    await db.sequelize.sync({ force: false, alter: true });
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
