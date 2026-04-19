import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
import spaceRouter from "./routes/space.route.js";

dotenv.config();

const PORT = process.env.PORT || 3001;

console.log("PORT: ", PORT);

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://frontend-metaverse.com"],
    credentials: true,
  }),
);

/// route api's
app.use("/api/v1", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/space", spaceRouter);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
