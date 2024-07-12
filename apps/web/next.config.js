/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/github",
        destination: "https://github.com/guming/ai-editor",
        permanent: true,
      },
      {
        source: "/feedback",
        destination: "https://github.com/guming/ai-editor/issues",
        permanent: true,
      },
      {
        source: "/deploy",
        destination: "https://vercel.com/templates/next.js/novel",
        permanent: true,
      },
    ];
  },
  productionBrowserSourceMaps: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin({
        resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
    }))

    return config
},
};

module.exports = nextConfig;
