import express, { Request, Response } from "express";
import { AddonsService } from "../services/addons.service";

const router = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const addons = await AddonsService.getAddons();
    res.json(addons);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
