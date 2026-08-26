const MAX_SIZE = 1000;
function boundedSet(map, key, value) {
  if (map.size >= MAX_SIZE) {
    const oldestKey = map.keys().next().value;
    map.delete(oldestKey);
  }
  map.set(key, value);
}

const map = new Map();

console.log("before:", process.memoryUsage().heapUsed / 1024 / 1024, "MB");
const n = 500_000;

require("v8").writeHeapSnapshot();

for (let i = 0; i < n; i++) {
  const simulatedRequest = {
    id: i,
    data: `Request data for ${i}`.repeat(20),
  };
  boundedSet(map, i, simulatedRequest);
  if (i % 100_000 === 0) {
    console.log("after:", process.memoryUsage().heapUsed / 1024 / 1024, "MB");
  }
}

console.log("after:", process.memoryUsage().heapUsed / 1024 / 1024, "MB");
require("v8").writeHeapSnapshot();
