import db from "../config/db";

export class PlansService {
  static async getPlans() {
    try {
      const [rows] = await db.query("SELECT * FROM plans");
      return rows;
    } catch (error) {
      throw new Error(`Database Error: ${(error as Error).message}`);
    }
  }
}
