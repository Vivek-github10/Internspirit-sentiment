import NodeCache from "node-cache";

// Cache for 15 minutes by default
const cache = new NodeCache({ stdTTL: 900 });

export const cacheData = {
  get: (key) => cache.get(key),
  set: (key, data) => cache.set(key, data),
  has: (key) => cache.has(key),
};
