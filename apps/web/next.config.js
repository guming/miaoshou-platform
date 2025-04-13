/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/github",
        destination: "https://github.com/guming/miaodou-platform",
        permanent: true,
      },
      {
        source: "/voiceToNotes",
        destination: "https://miaoshou-notes-gpt.vercel.app",
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
