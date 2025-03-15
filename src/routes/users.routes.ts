import express, { Request, Response } from "express";
import { UsersService } from "../services/users.service";

const router = express.Router();

interface UserRequestBody {
  name: string;
  email: string;
  phone: string;
  planId: number;
  billingCycle: "monthly" | "yearly";
  addons?: number[];
}

router.post("/submit", async (req: Request, res: Response): Promise<any> => {
  try {
    const userData: UserRequestBody = req.body;
    const result = await UsersService.registerUser(userData);
    res.status(201).json(result);
  } catch (err) {
    console.error("user registrations error:", err);
    return res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
