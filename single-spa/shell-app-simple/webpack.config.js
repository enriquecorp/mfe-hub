const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin").container;
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "tecnocrata";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    output: {
      //publicPath: "http://localhost:3001/",
      libraryTarget: "system",
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "home",
        library: { type: "var", name: "home" },
        // library: { type: "system" },
        // filename: "remoteEntry.js",
        remotes: {
          // 'home-nav': 'navigation',
          // body: "body@http://localhost:5003/remoteEntry.js",
          vueapp: "body",
          angular11ModuleFederation: "angular11ModuleFederation",
        },
        // exposes: {},
        // shared: [],
      }),
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
    ],
  });
};
