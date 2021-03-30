const { spawn } = require("child_process");
const webpack = require("webpack");

const webpacks = [
  "./resources/graphql/webpack.config.js",
  "./resources/inventory/webpack.config.js",
  "./resources/players/webpack.config.js",
]

const server = spawn(
  "cmd.exe", 
  ["/c", "C:\\FXServer\\FXServer.exe +exec server.cfg"]
)

server.stdout.pipe(process.stdout);
server.stdin.pipe(process.stdin);
server.stderr.pipe(process.stderr);

const compiler = webpack(webpacks.map((path) => require(path)).flat());

const watching = compiler.watch({}, (err, stats) => {
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