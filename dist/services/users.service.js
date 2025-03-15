"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const db_1 = __importDefault(require("../config/db"));
class UsersService {
    static registerUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, phone, planId, billingCycle, addons } = data;
            if (!name || !email || !phone || !planId || !billingCycle) {
                throw new Error("Missing required fields");
            }
            try {
                // Insert user
                const [userResult] = yield db_1.default.query("INSERT INTO users (name, email, phone) VALUES (?, ?, ?)", [name, email, phone]);
                const userId = userResult.insertId;
                // Insert plan selection
                yield db_1.default.query("INSERT INTO user_selections (user_id, plan_id, billing_cycle) VALUES (?, ?, ?)", [userId, planId, billingCycle]);
                // Insert add-ons if selected
                if (addons && addons.length > 0) {
                    const addonValues = addons.map((addonId) => [userId, addonId]);
                    yield db_1.default.query("INSERT INTO user_addons (user_id, addon_id) VALUES ?", [
                        addonValues,
                    ]);
                }
                return { message: "User registered successfully", userId };
            }
            catch (error) {
                throw new Error(`Database Error: ${error.message}`);
            }
        });
    }
}
exports.UsersService = UsersService;
