import Connection from "rabbitmq-client";
import {
  Logger,
  AppConfiguration,
  Cache,
  ServiceProxy,
  SharedResource,
} from "./Singletons";

// Usage example for Logger singleton
const logger = Logger.getInstance();
logger.log("Logging a message...");

// Usage example for AppConfiguration singleton
const appConfig = AppConfiguration.getInstance();
const key = "TEST_KEY";
const value = "test value";
const mongo_database = "MONGODB_DATABASE";
const mongo_database_value = "nikolaosdb";
process.env[key] = value;
process.env[mongo_database] = mongo_database_value;
const config = appConfig.getConfig("TEST_KEY");
const config_mongodb = appConfig.getConfig("MONGODB_DATABASE");
console.log(config);
console.log(config_mongodb);

// Usage example for Cache singleton
const cache = Cache.getInstance();
cache.set("key", "value");
cache.set("nikolaosdb_collection", "mycollection");
const cachedValue = cache.get("key");
const cachedValueMongoCollection = cache.get("nikolaosdb_collection");
console.log(cachedValue);
console.log(cachedValueMongoCollection);

// Usage example for ServiceProxy singleton
const serviceProxy = ServiceProxy.getInstance();
serviceProxy.callService("http://example.com");

// Usage example for SharedResource singleton
const sharedResource = SharedResource.getInstance();
sharedResource.connectToDatabasePool();
sharedResource.connectToMessageQueue();
const mongo = sharedResource.connectToMongoDb(
  "mongodb://nikolaos:password@localhost:27017",
);
async function mongof() {
  // Use connect method to connect to the server

  await mongo.connect();
  const db = mongo.db(config_mongodb);
  const collection = db.collection(cachedValueMongoCollection);
  const insertResult = await collection.insertMany([
    { a: 1 },
    { a: 2 },
    { a: 3 },
  ]);
  console.log("Inserted documents =>", insertResult);

  return "done.";
}

mongof()
  .then(console.log)
  .catch(console.error)
  .finally(() => mongo.close());

const rabbit = new Connection("amqp://nikolaos:password@localhost:5672/galaxy");
async function rabbitmqf() {
  // Initialize:
  rabbit.on("error", (err) => {
    console.log("RabbitMQ connection error", err);
  });
  rabbit.on("connection", () => {
    console.log("Connection successfully (re)established");
  });

  // Consume messages from a queue:
  // See API docs for all options
  const sub = rabbit.createConsumer(
    {
      queue: "user-events",
      queueOptions: { durable: true },
      // handle 2 messages at a time
      qos: { prefetchCount: 2 },
      // Optionally ensure an exchange exists
      exchanges: [{ exchange: "my-events", type: "topic" }],
      // With a "topic" exchange, messages matching this pattern are routed to the queue
      queueBindings: [{ exchange: "my-events", routingKey: "users.*" }],
    },
    async (msg) => {
      console.log("received message (user-events)", msg);
      // The message is automatically acknowledged (BasicAck) when this function ends.
      // If this function throws an error, then msg is rejected (BasicNack) and
      // possibly requeued or sent to a dead-letter exchange. You can also return a
      // status code from this callback to control the ack/nack behavior
      // per-message.
    },
  );

  sub.on("error", (err) => {
    // Maybe the consumer was cancelled, or the connection was reset before a
    // message could be acknowledged.
    console.log("consumer error (user-events)", err);
  });

  // Declare a publisher
  // See API docs for all options
  const pub = rabbit.createPublisher({
    // Enable publish confirmations, similar to consumer acknowledgements
    confirm: true,
    // Enable retries
    maxAttempts: 2,
    // Optionally ensure the existence of an exchange before we use it
    exchanges: [{ exchange: "my-events", type: "topic" }],
  });

  // Publish a message to a custom exchange
  await pub.send(
    { exchange: "my-events", routingKey: "users.visit" }, // metadata
    { id: 1, name: "Alan Turing" },
  ); // message content

  // Or publish directly to a queue
  await pub.send("user-events", { id: 1, name: "Alan Turing" });

  // Clean up when you receive a shutdown signal
  async function onShutdown() {
    // Waits for pending confirmations and closes the underlying Channel
    await pub.close();
    // Stop consuming. Wait for any pending message handlers to settle.
    await sub.close();
    await rabbit.close();
  }
  process.on("SIGINT", onShutdown);
  process.on("SIGTERM", onShutdown);
}

rabbitmqf()
  .then(console.log)
  .catch(console.error)
  .finally(() => rabbit.close());
