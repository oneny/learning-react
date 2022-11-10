const express = require("express");
const router = express.Router();

// 사용자가 요청을 하면 서버에서 요청한 라우터로 옵니다.
// router.post("/", (req, res) => {
//   console.log('사용자가 요청했슴돠!'); // 터미널에 해당 콘솔이 찍힌거 보실 수 있습니다.
//   // 그리고 서버에서 JSON 형태로 다시 요청한 사용자에게 보내줍니다.
//   console.log(req.body);

//   res.status(200).json({ success: true });
// });

module.exports = router;