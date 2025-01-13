const dotenv = require("dotenv");

let ENV_FILE_NAME;
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: `${process.cwd()}/${ENV_FILE_NAME}` });
} catch (e) {
  /* empty */
}

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

// Database URL (here we use a local database called medusa-development)
const DATABASE_URL = process.env.DATABASE_URL;

// Medusa uses Redis, so this needs configuration as well
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

// This is the place to include plugins. See API documentation for a thorough guide on plugins.
const plugins = [
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
    },
  },
  // {
  //   resolve: `medusa-file-s3`,
  //   options: {
  //     s3_url: process.env.S3_URL,
  //     bucket: process.env.S3_BUCKET,
  //     region: process.env.S3_REGION,
  //     access_key_id: process.env.S3_ACCESS_KEY_ID,
  //     secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
  //     endpoint: process.env.S3_ENDPOINT,
  //   },
  // },
  {
    resolve: `@medusajs/file-local`,
    options: {
      // optional
      backend_url: "http://localhost:9000",
      upload_dir: "uploads",
    },
  },
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
];

const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL,
    },
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL,
    },
  },
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  database_type: "postgres",
  database_url: DATABASE_URL,
  redis_url: REDIS_URL,
  store_cors: STORE_CORS,
  admin_cors: ADMIN_CORS,
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  modules,
  plugins,
};
