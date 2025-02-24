/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images**.ravelrycache.com",
        port: "",
        pathname: "**",
        search: "",
      },
    ],
  },
};
