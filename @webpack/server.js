const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (resourceDirname) => ({
  mode: 'production',
  context: resourceDirname,
  entry: `./src/server/server.ts`,
  output: {
    path: path.resolve(
      resourceDirname,
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
      modulesDir: path.resolve(resourceDirname,  "..", "..", "node_modules"),
    })
  ]
});
