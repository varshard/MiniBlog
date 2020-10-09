const initServer = require("./backend/server");

initServer().then((server) => {
  server.listen(3000, (err) => {
    if (err) throw err;
  });
});
