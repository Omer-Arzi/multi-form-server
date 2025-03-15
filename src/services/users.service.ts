import db from "../config/db";

export interface UserRequestBody {
  name: string;
  email: string;
  phone: string;
  planId: number;
  billingCycle: "monthly" | "yearly";
  addons?: number[];
}

export class UsersService {
  static async registerUser(
    data: UserRequestBody
  ): Promise<{ message: string; userId: number }> {
    const { name, email, phone, planId, billingCycle, addons } = data;

    if (!name || !email || !phone || !planId || !billingCycle) {
      throw new Error("Missing required fields");
    }

    try {
      // Insert user
      const [userResult] = await db.query(
        "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)",
        [name, email, phone]
      );
      const userId = (userResult as any).insertId;

      // Insert plan selection
      await db.query(
        "INSERT INTO user_selections (user_id, plan_id, billing_cycle) VALUES (?, ?, ?)",
        [userId, planId, billingCycle]
      );

      // Insert add-ons if selected
      if (addons && addons.length > 0) {
        const addonValues = addons.map((addonId) => [userId, addonId]);
        await db.query("INSERT INTO user_addons (user_id, addon_id) VALUES ?", [
          addonValues,
        ]);
      }

      return { message: "User registered successfully", userId };
    } catch (error) {
      throw new Error(`Database Error: ${(error as Error).message}`);
    }
  }
}
