import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.get("/api/heatmap", (req, res) => {
  res.json({
    times: ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM"],
    data: [
      { resource: "Study Room A", values: [1, 3, 5, 2, 4] },
      { resource: "Computer Lab", values: [2, 4, 3, 5, 3] },
      { resource: "Projector", values: [0, 2, 3, 1, 4] }
    ]
  });
});

export default app;