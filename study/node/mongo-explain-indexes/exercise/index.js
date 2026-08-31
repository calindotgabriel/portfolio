const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");

const STATUSES = ["completed", "pending", "cancelled"];

function randomDate(daysBack) {
  const now = Date.now();
  const past = now - Math.random() * daysBack * 24 * 60 * 60 * 1000;
  return new Date(past);
}

async function main() {
  const mongod = await MongoMemoryServer.create();
  const client = new MongoClient(mongod.getUri());
  await client.connect();

  const db = client.db("shop");
  const orders = db.collection("orders");

  console.log("seeding 100.000 documente...");
  const docs = [];
  for (let i = 0; i < 100_000; i++) {
    docs.push({
      customerId: Math.floor(Math.random() * 5000),
      status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
      amount: Math.round(Math.random() * 1000 * 100) / 100,
      createdAt: randomDate(730), // ultimii 2 ani
    });
  }
  await orders.insertMany(docs);
  console.log("gata seed-ul.\n");

  const query = {
    status: "completed",
    createdAt: { $gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) }, // ultimele 90 de zile
  };

  console.log("=== ÎNAINTE de index ===");
  const before = await orders
    .find(query)
    .sort({ createdAt: -1 })
    .explain("executionStats");

  console.log(
    "stage câștigător:",
    before.queryPlanner.winningPlan.inputStage?.stage ??
      before.queryPlanner.winningPlan.stage,
  );
  console.log("totalDocsExamined:", before.executionStats.totalDocsExamined);
  console.log("nReturned:", before.executionStats.nReturned);
  console.log(
    "executionTimeMillis:",
    before.executionStats.executionTimeMillis,
  );

  // TODO: aici creezi indexul tu.
  await orders.createIndex({ status: 1, createdAt: 1 });
  //
  // apoi rulezi din nou EXACT același bloc de explain() de mai sus
  // (copiază-l, sau pune-l într-o funcție și apelează de două ori)
  // și compari cele patru numere.

  console.log("=== DUPA  index ===");
  const after = await orders
    .find(query)
    .sort({ createdAt: -1 })
    .explain("executionStats");

  console.log(
    "stage câștigător:",
    after.queryPlanner.winningPlan.inputStage?.stage ??
      after.queryPlanner.winningPlan.stage,
  );
  console.log("totalDocsExamined:", after.executionStats.totalDocsExamined);
  console.log("nReturned:", after.executionStats.nReturned);
  console.log("executionTimeMillis:", after.executionStats.executionTimeMillis);

  await client.close();
  await mongod.stop();
}

main().catch(console.error);
