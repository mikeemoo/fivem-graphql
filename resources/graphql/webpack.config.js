const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  context: __dirname,
  entry: `./src/server/server.ts`,
  output: {
    path: path.resolve(
      __dirname,
      'build'
     ),
    filename: `server.js`
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  target: "node",
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ }
    ],
  },
  externals: [
    nodeExternals({
      modulesDir: path.resolve(__dirname, "node_modules"),
      additionalModuleDirs: [
        path.resolve(__dirname, "..", "..", "node_modules")
      ]
    })
  ]
};
