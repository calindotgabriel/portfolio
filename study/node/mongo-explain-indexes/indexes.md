#log
spent time on writing: 30m session 1 26 Aug 17:00

# Mongo.interpret

explain() gives information about query:
1 - amount of time ( elapsed time ) of query
2 - used indexes ( if any / used )
3 - no. of docs and index keys scanned to give the result ( fulfill query )

statistic: cursor/db.collection.explain("executionStats")

e.g.
1 - db.inventory.insertMany([... {_id, item, type, quantity }]) \* 10
2 - db.inventory.find({quanity: {gte, lte}})
3 - db.inventory.explain("exeuctionStats")

# Query w. Index

db.inventory.createIndex({quantity}) <- support index
db.inventory.find({quantity}).explain("executionStats")

e.g. response of .explain("executionStats") :
{
queryPlanner: {
...
winningPlan: {
queryPlan: {
stage: 'FETCH',
inputStage: {
stage: 'IXSCAN',
keyPattern: {
quantity: 1
},
...
}
}
},
rejectedPlans: [ ]
},
executionStats: {
executionSuccess: true,
nReturned: 3,
executionTimeMillis: 0,
totalKeysExamined: 3,
totalDocsExamined: 3,
executionStages: {
...
},
...
},
...
}

with index: queried only 3 documents out of 10 total - scanning whole collection vs scanning matches

# How does SQL, Mongodb store data as such using indexes queries are efficient ?

- B-Trees is the strategy used by both SQL and MongoDb to organize indexed data in order for index queries to be efficient
- instead of physicially reordering full records on disk during every insertion, DBs create lightweight pre sorted ref keys to point where full records actually reside ( in memory representation using refs )

DB engines perform rapid range scans with the Leaf nodes linked horizontally via doubly linked lists

- Logarithmic Traversal O(log(n))

#Compound indexes

# Query plans, execution statistics
