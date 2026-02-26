// next.config.js
module.exports = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,  // This will ensure the env variable is correctly passed to the client
  },
}