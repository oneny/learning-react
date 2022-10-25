import React from "react";

// 사용자 동의 화면
function Agreement({ onAgree = (f) => f }) {
  return (
    <div>
      <p>Terms...</p>
      <p>These are the terms and stuff. Do you agree?</p>
      <button onClick={onAgree}>I agree</button>
    </div>
  );
}

export default Agreement;
