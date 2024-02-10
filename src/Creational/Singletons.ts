import { MongoClient } from "mongodb";

export class Logger {
  private static instance: Logger;
  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log(message: string): void {
    const date = new Date().toISOString();
    console.log(`[${date}] ${message}`);
  }
}

export class AppConfiguration {
  private static instance: AppConfiguration;
  private constructor() {}

  public static getInstance(): AppConfiguration {
    if (!AppConfiguration.instance) {
      AppConfiguration.instance = new AppConfiguration();
    }
    return AppConfiguration.instance;
  }

  public getConfig(key: string): any {
    return process.env[key];
  }
}

export class SharedResource {
  private static instance: SharedResource;
  private constructor() {}

  public static getInstance(): SharedResource {
    if (!SharedResource.instance) {
      SharedResource.instance = new SharedResource();
    }
    return SharedResource.instance;
  }

  public connectToDatabasePool(): void {
    console.log("Connecting to Database pool...");
  }

  public connectToMongoDb(url: string): MongoClient {
    console.log("Connecting to MongoDB...");
    return new MongoClient(url);
  }

  public connectToMessageQueue(): void {
    console.log("Connecting to Message Queue...");
  }
}

export class Cache {
  private static instance: Cache;
  private cache: Map<string, any>;
  private constructor() {
    this.cache = new Map();
  }

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }

  public set(key: string, value: any): void {
    this.cache.set(key, value);
  }

  public get(key: string): any {
    return this.cache.get(key);
  }
}

export class ServiceProxy {
  private static instance: ServiceProxy;
  private constructor() {}

  public static getInstance(): ServiceProxy {
    if (!ServiceProxy.instance) {
      ServiceProxy.instance = new ServiceProxy();
    }
    return ServiceProxy.instance;
  }

  public callService(serviceName: string): void {
    console.log(`Calling service... ${serviceName}`);
  }
}
