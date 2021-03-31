const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (resourceDirname) => ({
  mode: 'production',
  context: resourceDirname,
  entry: `./src/client/client.ts`,
  output: {
    path: path.resolve(
      resourceDirname,
      'build'
    ),
    filename: `client.js`
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  target: "web",
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ }
    ],
  },
  externals: [
    nodeExternals()
  ]
})