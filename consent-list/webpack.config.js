const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "angularMfe",
    publicPath: "http://localhost:4200/",
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        services: "services@http://localhost:3004/remoteService.js",
      },
    }),
    new ModuleFederationPlugin({
      name: "consent_list",
      filename: "remoteEntry.js",
      exposes: {
        './Mount': './src/loadExposedModules',
      },
      shared: share({
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: '16.2.12' },
        "@angular/common": { singleton: true, strictVersion: true, requiredVersion: '16.2.12' },
        "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: '16.2.12' },
        "@angular/router": { singleton: true, strictVersion: true, requiredVersion: '16.2.12' },
        ...sharedMappings.getDescriptors()
      })
    }),
    sharedMappings.getPlugin()
  ],
};
