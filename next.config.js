/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/investments',
        permanent: true,
      },
    ];
  },
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    TELEGRAM_BOT_API_TOKEN: process.env.TELEGRAM_BOT_API_TOKEN,
    TELEGRAM_API_URL: process.env.TELEGRAM_API_URL,
    TELEGRAM_BOT_CHAT_ID: process.env.TELEGRAM_BOT_CHAT_ID,
  },
};

module.exports = nextConfig;
