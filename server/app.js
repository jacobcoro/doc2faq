const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const config = require("../config");
const projectPath = config.projectPath;
const PORT =
  process.env.PORT || process.env.NODE_ENV === "production" ? 80 : 3001;

const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../client/build")));
// var whitelist = ["http://example1.com", "http://example2.com"];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// app.use(cors(corsOptions));
app.use(cors());

app.use("/api", indexRouter);

app.get("/", (req, res) => {
  console.log("sending file", projectPath + "/client/build/");
  res.sendFile(projectPath + "/client/build/");
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}. project path${projectPath}`);
});

// module.exports = app;
