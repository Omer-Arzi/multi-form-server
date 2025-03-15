import express, { Request, Response } from "express";
import { PlansService } from "../services/plans.service";

const router = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const plans = await PlansService.getPlans();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
