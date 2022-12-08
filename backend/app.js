require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const { logEvents, logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const verifyJWT = require("./middleware/verifyJWT");
const connectDB = require("./config/dbConn");

app.set("port", process.env.PORT || 3500);

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(morgan("dev"));
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentitals requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // built-in middleware for json

// middlewrare for cookies
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "uploads"))); // serve static files


// app.use(session({
//   saveUninitialized: false,
//   resave: false,
//   secret: process.env.COOKIE_SECRET,
//   cookie: {
//     httpOnly: true,
//     secure: false,
//   }
// }));
app.use((req, res, next) => {
  const origin = req.headers.origin;

  res.header('Access-Control-Allow-Credentials', true);
  next();
});


// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use("/users", require("./routes/api/users"));
app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));
app.use('/notes', require('./routes/note'));

app.use((req, res, next) => { // 404 미들웨어
  // const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  // error.status = 404;
  // next(error);
  
  res.status(404);
  // if (req.accepts("html")) {
  //   res.sendFile(path.join(__dirname, "views", "404.html" ));
  // }
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);


app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트 - 서버 실행 중");
});