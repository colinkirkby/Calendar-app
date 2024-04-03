// next.config.js

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  output: "standalone", // Outputs the server in a single `server.js` file (corrected from 'export' which is not a valid option).
  distDir: "dist", // Changes the build output directory to `dist/`.
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table"
  ]
};

export default nextConfig;
