module.exports = [
  require("../../@webpack/ui")(__dirname),
  require("../../@webpack/client")(__dirname),
  require("../../@webpack/server")(__dirname)
];