import React, { useRef } from "react";

// 참조(ref)라는 리액트 기능을 사용해 직접 DOM에 접근하기
// 리액트에서 참조는 컴포넌트의 생명주기(lifetime) 값을 저장하는 객체다.
function AddColorForm({ onNewColor = (f) => f }) {
  // useRef 훅을 사용해 2가지 참조 생성
  // DOM 엘리먼트를 직접 참조하는 참조 객체에 대한 current 필드를 생성한다.
  // -> 이 필드를 통해 엘리먼트에 접근 -> 엘리먼트의 값 접근 가능
  const txtTitle = useRef(); // 색의 이름을 수집하기 위해 폼에 추가한 텍스트 입력에 대한 참조
  const hexColor = useRef(); // HTML 색 입력의 16진 색 값에 접근하기 위한 참조

  // HTML 폼을 제출할 때 디폴트 동작은 현재 URL로 폼 엘리먼트에 저장된 값이 본문에 들어 있은 POST 요청을 보내는 것이다.
  const submit = (e) => {
    e.preventDefault(); // 브라우저가 폼을 POST 요청으로 제출하지 못하도록 막는다.
    const title = txtTitle.current.value; // 참조를 통해 폼 엘리먼트들의 현재 값을 얻어온다.
    const color = hexColor.current.value;
    onNewColor(title, color); // onNewColor 함수 프로퍼티를 통해 컴포넌트의 부모에게 전달한다.
    txtTitle.current.value = "";
    hexColor.current.value = "";
  };

  return (
    <form action="" onSubmit={submit}>
      <input ref={txtTitle} type="text" placeholder="color title..." required />
      <input ref={hexColor} type="color" required />
      <button>ADD</button>
    </form>
  );
}

export default AddColorForm;
