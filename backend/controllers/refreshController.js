// const usersDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) { this.users = data }
// }
const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized
  const refreshToken = cookies.jwt;

  // DB에 저장된 refreshToken 비교
  // const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); // Forbidden
  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || foundUser.username !== decoded.username) return res.sendStatus(403); // Forbidden
      const roles = Object.values(foundUser.roles);
      const accessToken = jwt.sign(
        { 
          "UserInfo": {
            "username": decoded.username,
            "roles": roles,
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );
      res.json({ accessToken });
    }
  );
}

module.exports = { handleRefreshToken };