import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
    path: `/dashboard`,
    vite: () => {
      return {
        server: {
          allowedHosts: [".hypakicks-production.up.railway.app"], // replace ".medusa-server-testing.com" with ".yourdomain.com"
        },
      };
    },
  },
  modules: [
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "./src/modules/mpgs",
            id: "mpgs",
            options: {
              // provider options...
              msoUrl: process.env.MPGS_MSO_URL,
              merchantId: process.env.MPGS_MERCHANT_ID,
              apiPassword: process.env.MPGS_API_PASSWORD,
              currency: process.env.MPGS_CURRENCY,
            },
          },
        ],
      },
    },
    {
      resolve: "@medusajs/medusa/fulfillment",
      options: {
        providers: [
          {
            resolve: `@medusajs/medusa/fulfillment-manual`,
            id: "manual",
            options: {
              // provider options...
            },
          },
        ],
      },
    },
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-local",
            id: "local",
            options: {
              // provider options...
              backend_url: process.env.BACKEND_URL,
            },
          },
        ],
      },
    },
    // {
    //   resolve: "@medusajs/medusa/event-bus-local",
    // },

    {
      resolve: "@medusajs/medusa/cache-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
        ttl: 0,
      },
    },
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      options: {
        redisUrl: process.env.EVENTS_REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/workflow-engine-inmemory",
    },
    // {
    //   resolve: "@medusajs/medusa/workflow-engine-redis",
    //   options: {
    //     redis: {
    //       url: process.env.REDIS_URL,
    //     },
    //   },
    // },
  ],
});
