const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath: "http://localhost:3004/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3004,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  // optimization: {
  //   runtimeChunk: 'single',
  //   splitChunks: false,
  // },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       defaultVendors: {
  //         name: `chunk-vendors`,
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10,
  //         chunks: 'async',
  //         reuseExistingChunk: true
  //       },
  //       common: {
  //         name: `chunk-common`,
  //         minChunks: 2,
  //         priority: -20,
  //         chunks: 'async',
  //         reuseExistingChunk: true
  //       }
  //     }
  //   },
  // },
  plugins: [
    new ModuleFederationPlugin({
      name: "main_consent",
      filename: "remoteEntry.js",
      remotes: {
        consent_form: "consent_form@http://localhost:3003/remoteEntry.js",
        consent_list: "consent_list@http://localhost:4200/remoteEntry.js",
        main_consent: "main_consent@http://localhost:3004/remoteEntry.js",
      },
      // exposes: {
      //  "./Store": "./src/lib/store/baseStore",
      // },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new ModuleFederationPlugin({
      name: 'services',
      filename: "remoteService.js",
      library: { type: 'var', name: 'services' },
      exposes: {
        './Load':  "./src/lib/services/loadExposedServices",
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
