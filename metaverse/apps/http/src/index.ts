import express from "express";
import cors from "cors";

const PORT = 3000;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://frontend-metaverse.com"],
    credentials: true,
  }),
);




app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
