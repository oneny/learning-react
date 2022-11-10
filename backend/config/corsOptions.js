const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // first parameter in the callback: null which is usually the error
      // we set the second one to true
      // and that just means that the origin will be sent back saying yes that's the same origin and it is allowed
      callback(null, true);
    } else {
      // allowedOrigins이거나 headers.origin이 없으면 
      // in the callback we have an error instead of null
      // and we can just say not allowed by cors that is the message to go along with the error
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200
}

module.exports = corsOptions;