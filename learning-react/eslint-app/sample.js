import React, { useState } from 'react'

function gnar() {
  const [nickname, setNickname] = useState("Dud");

  console.log(nickname, setNickname);

  return <img src="/img.png" alt="" />;
}

export default gnar;