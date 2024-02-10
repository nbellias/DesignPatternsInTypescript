import {
  AppConfiguration,
  Logger,
  SharedResource,
  Cache,
  ServiceProxy,
} from "./Singletons";

describe("Logger", () => {
  it("should log a message", () => {
    const logger = Logger.getInstance();
    const spy = jest.spyOn(console, "log");
    const message = "Test message";
    const date = new Date().toISOString();

    logger.log(message);

    expect(spy).toHaveBeenCalledWith(`[${date}] ${message}`);
    spy.mockRestore();
  });
});

describe("AppConfiguration", () => {
  it("should get a value from the environment", () => {
    const appConfiguration = AppConfiguration.getInstance();
    const key = "TEST_KEY";
    const value = "test value";
    process.env[key] = value;

    expect(appConfiguration.getConfig(key)).toBe(value);
  });
});

describe("SharedResource", () => {
  it("should connect to a database pool", () => {
    const sharedResource = SharedResource.getInstance();
    const spy = jest.spyOn(console, "log");

    sharedResource.connectToDatabasePool();

    expect(spy).toHaveBeenCalledWith("Connecting to Database pool...");
    spy.mockRestore();
  });

  it("should connect to a message queue", () => {
    const sharedResource = SharedResource.getInstance();
    const spy = jest.spyOn(console, "log");

    sharedResource.connectToMessageQueue();

    expect(spy).toHaveBeenCalledWith("Connecting to Message Queue...");
    spy.mockRestore();
  });
});

describe("Cache", () => {
  it("should set a value", () => {
    const cache = Cache.getInstance();
    const key = "testKey";
    const value = "test value";

    cache.set(key, value);

    expect(cache.get(key)).toBe(value);
  });
});

describe("Service Proxy", () => {
  it("should get a service proxy", () => {
    const serviceProxy = ServiceProxy.getInstance();
    const spy = jest.spyOn(console, "log");

    serviceProxy.callService("http://example.com");

    expect(spy).toHaveBeenCalledWith("Calling service... http://example.com");
    spy.mockRestore();
  });
});

describe("Singletons usages", () => {
  it("should create a single instance of each singleton", () => {
    const logger1 = Logger.getInstance();
    const logger2 = Logger.getInstance();
    const appConfig1 = AppConfiguration.getInstance();
    const appConfig2 = AppConfiguration.getInstance();
    const sharedResource1 = SharedResource.getInstance();
    const sharedResource2 = SharedResource.getInstance();
    const cache1 = Cache.getInstance();
    const cache2 = Cache.getInstance();
    const serviceProxy1 = ServiceProxy.getInstance();
    const serviceProxy2 = ServiceProxy.getInstance();

    expect(logger1).toBe(logger2);
    expect(appConfig1).toBe(appConfig2);
    expect(sharedResource1).toBe(sharedResource2);
    expect(cache1).toBe(cache2);
    expect(serviceProxy1).toBe(serviceProxy2);
  });
});
