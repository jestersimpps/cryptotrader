module.exports = {
  apps: [
    {
      name: "api",
      script: "dist/index.js",
      instances: process.env.APP_INSTANCES || 2,
    },
  ],
};
