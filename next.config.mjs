import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    domains: ["imagedelivery.net"],
  },
  // Add any other Next.js config options here
};

export default withNextIntl(nextConfig);
