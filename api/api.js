const express = require("express");
const appMiddleware = require("./http/middleware/middleware");
const configureRoutes = require("./routes/routes");
const errorHandler = require("./http/middleware/error-handler");

const PORT = process.env.PORT || 5050;

const app = express();

appMiddleware(app);
configureRoutes(app);
app.use(errorHandler);

app.listen(PORT, (err) => {
  if (err) throw err;

  console.log(`ready at http://localhost:${PORT}`);
});

module.exports = app;