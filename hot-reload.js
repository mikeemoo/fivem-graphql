const { spawn } = require("child_process");
const webpack = require("webpack");
const chokidar = require("chokidar");
const { generate } = require("@graphql-codegen/cli");
const fs = require("fs");

const codegenConfig = JSON.parse(fs.readFileSync(`${__dirname}/codegen.json`, "utf8"));
const { FXServer, licenceKey } = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`, "utf8"));

const webpacks = [
  "./resources/mm-graphql/webpack.config.js",
  "./resources/mm-inventory/webpack.config.js",
  "./resources/mm-players/webpack.config.js",
]

const server = spawn(
  "cmd.exe", 
  ["/c", `${FXServer} +exec server.cfg +set sv_licenseKey ${licenceKey}`]
)

server.stdout.pipe(process.stdout);
server.stdin.pipe(process.stdin);
server.stderr.pipe(process.stderr);

// check for graphql schema changes, rebuild types and restart all modules
chokidar.watch('./resources/**/*.graphql').on('change', (event, path) => {
  generate(codegenConfig, true).then(() => {
    server.stdin.write(`restart mm-graphql\n`);
  })
});

const compiler = webpack(webpacks.map((path) => require(path)).flat());

compiler.watch({}, (err, stats) => {
  if (err) {
    console.log("ERRASHS!");
  } else {
    stats.toJson().children.forEach(({ outputPath, errors }) => {
      if (errors.length > 0) {
        errors.forEach((err) => { 
          process.stdout.write(err.file + "\n");
          process.stdout.write(err.message + "\n");
        })
        return;
      }
      const match = outputPath.match(/\\resources\\([^\\]+)/);
      if (match) {
        const resource = match[1];
        server.stdin.write(`restart ${resource}\n`);
      }
    });
  }
});

process.on("exit", () => server.kill());