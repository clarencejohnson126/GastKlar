/**
 * Gibt einen Redaktionsplan als JSON aus (nur Entwürfe, kein Posting).
 * Nutzung: npm run content:plan -- 2026-11-02 14
 */
import { planPosts } from "../src/modules/content/plan.ts";

const [start = new Date().toISOString().slice(0, 10), days = "14", time = "18:00"] = process.argv.slice(2);
console.log(JSON.stringify(planPosts(start, Number(days), time), null, 2));
