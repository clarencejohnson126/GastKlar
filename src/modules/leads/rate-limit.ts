/**
 * Einfaches Sliding-Window-Rate-Limit pro Schlüssel (IP).
 * Gilt nur pro Server-Instanz — für Serverless später durch Redis-Adapter mit gleicher Signatur ersetzen.
 */
export interface RateLimiter {
  check(key: string): boolean;
}

export function createMemoryRateLimiter(max: number, windowMs: number): RateLimiter {
  const hits = new Map<string, number[]>();
  return {
    check(key) {
      const now = Date.now();
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      if (recent.length >= max) {
        hits.set(key, recent);
        return false;
      }
      recent.push(now);
      hits.set(key, recent);
      if (hits.size > 10_000) hits.clear(); // Speicher begrenzen
      return true;
    },
  };
}

export const leadRateLimiter = createMemoryRateLimiter(
  Number(process.env.LEAD_RATE_LIMIT_MAX ?? 5),
  10 * 60 * 1000,
);
