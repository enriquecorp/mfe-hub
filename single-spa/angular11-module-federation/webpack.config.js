const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, "tsconfig.json"), [
  /* mapped paths to share */
]);

module.exports = {
  output: {
    uniqueName: "angular11ModuleFederation",
    publicPath: "auto",
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      // ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      // For remotes (please adjust)
      name: "angular11ModuleFederation",
      // library: { type: "var", name: "angular11ModuleFederation" },
      filename: "remoteEntry.js",
      exposes: {
        "./FModule": "./src/app/robot/robot.single-spa.ts",
      },

      shared: {
        // "@angular/core": {
        //   singleton: true,
        //   strictVersion: true,
        //   requiredVersion: "auto",
        // },
        // "@angular/common": {
        //   singleton: true,
        //   strictVersion: true,
        //   requiredVersion: "auto",
        // },
        // "@angular/common/http": {
        //   singleton: true,
        //   strictVersion: true,
        //   requiredVersion: "auto",
        // },
        // "@angular/router": {
        //   singleton: true,
        //   strictVersion: true,
        //   requiredVersion: "auto",
        // },
        "@angular/core": { singleton: true, strictVersion: false },
        "@angular/common": { singleton: true, strictVersion: false },
        "@angular/router": { singleton: true, strictVersion: false },
        ...sharedMappings.getDescriptors(),
      },
    }),
    sharedMappings.getPlugin(),
  ],
};
