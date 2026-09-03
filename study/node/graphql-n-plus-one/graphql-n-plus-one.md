# GQL Performance

Because GraphQL requests are dynamic and we do not know in advance what field a client will
include, and the API is served through a single endpoint - they seem hard to cache.

In practice GQL is as cacheable as any API w. param requests like REST. Libraries usually have
caching strategies built in.

## Client-side Caching

- HTTP caching to avoid refetching resources and identify when two res are the same
- Defining a globally unique ID field for an Object type can facilitate various types of caching
- Using GETs can improve performance because GETs are cacheable
- Browsers & CDNs have limits on URL size
- Can use persisted queries
  - Where client sends a hash of the query instead of full text query
  - Server looks up the hash in server-side store - validates and executes
  - Hashed queries reduce amount of data sent to server

## N + 1 Problem

What is it? When an initial request leads to N subsequent requests to resolve the response —
e.g. a hero's friends.

### Batching at N+1

Multiple requests are collected over a short period and dispatched all in a single request to
DB/micro-service by using DataLoaders or other optimisation libraries/strategies.

## Demand Control

One malicious actor can cause the GQL to batch/expand a lot of queries which will terminate the
server by overflowing DB, so a secure design has implemented strategies like paginating list
fields (default set), limiting operation depth and breadth, and query complexity analysis and
shortcircuiting.

## JSON

GQL does not require specifically JSON but services do respond typically in JSON.

JSON (mostly text) compresses well with algs. such as GZIP, deflate and brotli.

It's encouraged that prod GQLs should have GZIP enabled and clients to send header:

```
Accept-Encoding: gzip
```

## Monitoring

Observability tooling like OpenTelemetry provide tools that can be used with GQL to collect
metrics, traces, logs during requests.
