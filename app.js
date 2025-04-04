require("dotenv").config();
const path = require('path');
const logger = require('morgan');
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const chatbot = require('./routes/chatbot');
const swaggerUI = require("swagger-ui-express");
const openApiConfigration = require("./docs/swagger");
const basicAuth = require("express-basic-auth");
const {dbConnect} = require("./configuration/db")
const app = express();
const port = process.env.APP_PORT
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/chatbot', chatbot);

const userDoc = process.env.DOC_USER
const passDoc = process.env.DOC_PASS

const options = {
  swaggerOptions: {
    url: "/api-doc/swagger.json",
  },
};
const swaggerAuth = basicAuth({
  users: { [userDoc]:passDoc }, // Usuario y contraseña estáticos (se puede mover a .env)
  challenge: true, // Muestra el prompt en el navegador
  unauthorizedResponse: "No autorizado" // Mensaje de error personalizado
});

app.get("/api-doc/swagger.json", (req, res) => res.json(openApiConfigration));
app.use(
  "/api-doc",
  swaggerAuth,
  swaggerUI.serveFiles(null, options),
  swaggerUI.setup(null, options)
);
dbConnect()
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.listen(port, () => {
  console.log(port);
});// error handler

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
 res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
