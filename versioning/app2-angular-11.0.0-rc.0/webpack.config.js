const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "http://localhost:42031/",
    uniqueName: "app2",
  },
  optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      // For remotes (please adjust)
      name: "app2",
      library: { type: "var", name: "app2" },
      filename: "remoteEntry.js",
      exposes: {
        "./web-components": "./src/bootstrap.ts",
      },

      shared: {
        "@angular/core": { requiredVersion: "11.0.0-rc.0" },
        "@angular/common": { requiredVersion: "11.0.0-rc.0" },
        "@angular/router": { requiredVersion: "11.0.0-rc.0" },
        rxjs: { requiredVersion: "6.6.0" },
      },
    }),
  ],
};
