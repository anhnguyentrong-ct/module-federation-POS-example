const NextFederationPlugin = require('@module-federation/nextjs-mf');
const {createDelegatedModule} = require('@module-federation/utilities');

const remotes = (isServer, options) => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    testPOS: createDelegatedModule(require.resolve('./remote-delegate.js'), {
      remote: `testPOS@http://localhost:3000/_next/static/${location}/remoteEntry.js`
    }),
    // testUNI: `testUNI@http://localhost:8080/_next/static/${options.isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
  };
};

module.exports = {
  webpack(config, options) {

    const location = options.isServer ? 'ssr' : 'chunks';

    config.plugins.push(
      new NextFederationPlugin({
        name: 'home',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './nav': './components/nav.js',
          './home': './pages/index.js',
          './pages-map': './pages-map.js',
        },
        remotes: remotes(options.isServer, options),
        // remotes: {
        //   testPOS: `testPOS@http://localhost:3000/_next/static/${options.isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
        // },
        shared: {
          lodash: {},
        },
        extraOptions: {
          automaticAsyncBoundary: true
        }
      }),
    );

    return config;
  },
};
