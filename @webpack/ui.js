const path = require('path');

module.exports = (resourceDirname) => ({
  mode: 'production',
  context: resourceDirname,
  entry: `./src/ui/ui.tsx`,
  output: {
    path: path.resolve(
      resourceDirname,
      'build'
    ),
    filename: `ui.js`
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
  externals: []
});