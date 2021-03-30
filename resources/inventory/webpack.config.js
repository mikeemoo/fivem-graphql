const path = require('path');
const nodeExternals = require('webpack-node-externals');

const getConfig = (environment) => ({
  mode: 'production',
  context: __dirname,
  entry: `./src/${environment}/${environment}.ts`,
  output: {
    path: path.resolve(
      __dirname,
      'build'
    ),
    filename: `${environment}.js`
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  target: environment === "server" ? "node" : "web",
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ }
    ],
  },
  externals: [
    nodeExternals(environment === "server" ? {
      modulesDir: path.resolve(__dirname, "node_modules"),
      additionalModuleDirs: [
        path.resolve(__dirname, "..", "..", "node_modules")
      ]
    } : {})
  ]
});

module.exports = [
  getConfig("server"),
  getConfig("client")
];
