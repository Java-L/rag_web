const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SALES_APP_ID: process.env.NEXT_PUBLIC_SALES_APP_ID,
    NEXT_PUBLIC_SALES_APP_KEY: process.env.NEXT_PUBLIC_SALES_APP_KEY,
    NEXT_PUBLIC_CUSTOMER_SERVICE_APP_ID: process.env.NEXT_PUBLIC_CUSTOMER_SERVICE_APP_ID,
    NEXT_PUBLIC_CUSTOMER_SERVICE_APP_KEY: process.env.NEXT_PUBLIC_CUSTOMER_SERVICE_APP_KEY,
    NEXT_PUBLIC_PRODUCT_APP_ID: process.env.NEXT_PUBLIC_PRODUCT_APP_ID,
    NEXT_PUBLIC_PRODUCT_APP_KEY: process.env.NEXT_PUBLIC_PRODUCT_APP_KEY,
  },
}

module.exports = nextConfig 