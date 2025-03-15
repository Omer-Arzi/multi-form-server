import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import plansRoutes from "./routes/plans.routes";
import addonsRoutes from "./routes/addons.routes";
import usersRoutes from "./routes/users.routes";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/plans", plansRoutes);
app.use("/api/addons", addonsRoutes);
app.use("/api/users", usersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
