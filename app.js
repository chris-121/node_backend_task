const createError = require("http-errors");
const express = require("express");

const cookieParser = require("cookie-parser");
const logger = require("morgan");

const eventRouter = require("./src/routes/event");
const path = require("path");
const PORT = "3001";

const app = express();
const mongoose = require("mongoose");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", eventRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, () => {
  console.log("server started");
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(
      "mongodb+srv://chrisjacob876:xsLhwJ72aPj5kUog@cluster0.usn9xmp.mongodb.net/?retryWrites=true&w=majority",
      connectionParams
    )
    .then(() => console.log("mongoDB connected successfully"))
    .catch(() => console.log("hehehehheheh"));
});

module.exports = app;
