const { parsed: env } = require('dotenv').config();

module.exports = {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.node = {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
      };
    }
    return config;
  },
  env,
};
