const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const cookies = req.cookies;
  console.log(`cookie avaiable at login: ${JSON.stringify(cookies)}`);
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.status(400).json({ "message": "Username and password are required. "});

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); // Unauthorized
  
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    // create JWTs
    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "username": foundUser.username,
          "roles": roles,
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    const newRefreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Changed to let keyword
    let newRefreshTokenArray = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

    if (cookies?.jwt) {
      // Scenario added here:
      //   1) User logs in but never uses RT and does not logout
      //   2) RT is stolen
      //   3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
      const refreshToken = cookies.jwt;
      const foundToken = await User.findOne({ refreshToken }).exec();

      // Detected refresh token reuse!
      if (!foundToken) {
        console.log("attempted refresh token resuse at login!");
        newRefreshToken = [];
      }

      res.clearCookie("jwt", { HttpOnly: true, SameSite: "None", secure: true });
    }

    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save();
    console.log(result);

    // refrshToken은 쿠키로
    res.cookie("jwt", newRefreshToken, { HttpOnly: true, secure: true, SameSite: "None", maxAge: 24 * 60 * 60 * 1000 }); // secure: true
    res.json({ roles, accessToken }); // accessToken은 json으로
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

module.exports = { handleLogin };