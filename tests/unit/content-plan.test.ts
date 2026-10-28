import assert from "node:assert/strict";
import { test } from "node:test";
import { planPosts, platformsFor } from "../../src/modules/content/plan.ts";

test("TikTok täglich, Instagram/Facebook im Tageswechsel laut 06", () => {
  assert.deepEqual(platformsFor("2026-11-02"), ["tiktok", "instagram"]); // Mo
  assert.deepEqual(platformsFor("2026-11-03"), ["tiktok", "facebook"]); // Di
  assert.deepEqual(platformsFor("2026-11-08"), ["tiktok", "instagram"]); // So
  assert.deepEqual(platformsFor("2026-11-09"), ["tiktok", "facebook"]); // Mo der Folgewoche wechselt
});

test("Mix 50/30/20 über 10 Tage, alles DRAFT mit KI-Kennzeichnung", () => {
  const posts = planPosts("2026-11-02", 10);
  const count = (p: string) => posts.filter((x) => x.pillar === p).length;
  assert.equal(count("tip"), 5);
  assert.equal(count("insight"), 3);
  assert.equal(count("offer"), 2);
  assert.ok(posts.every((p) => p.status === "DRAFT" && p.aiDisclosure && p.timezone === "Europe/Berlin"));
});

test("keine Preise in Themen oder CTAs", () => {
  const text = JSON.stringify(planPosts("2026-11-02", 30));
  assert.doesNotMatch(text, /€|\bab \d|Preis ab/);
});
