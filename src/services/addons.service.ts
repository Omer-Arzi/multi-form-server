import db from "../config/db";

export class AddonsService {
  static async getAddons() {
    try {
      const [rows] = await db.query(
        "SELECT id, name, description, price FROM addons"
      );
      return rows;
    } catch (error) {
      throw new Error(`Database Error: ${(error as Error).message}`);
    }
  }
}
