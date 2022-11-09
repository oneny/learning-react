import React, { Component } from 'react';

function ErrorScreen({ error }) {
  //
  // 여기서 메시지를 렌더링하기 전에 오류를 추적하거나 처리할 수 있다.
  //
  return (
    <div className="error">
      <h3>We are sorry... something went wrong</h3>
      <p>We cannot process your request at this moment.</p>
      <p>ERROR: {error.message}</p>
    </div>
  )
}

// 클래스 컴포넌트를 사용하여 오류 경계 컴포넌트 만들기
// 클래스 컴포넌트는 컴포넌트 생명 주기에 따라 호출되는 구체적인 메서드를 사용할 수 있다.
export default class ErrorBoundary extends Component {
  state = { error: null }

  // getDerivedStateFromError도 생명주기 메서드로 사용할 수 있다.
  // 이 메서드는 렌더링 과정에서 children 내부에서 오류가 발생했을 때 호출된다.
  // 오류가 발생하면 state.error가 설정된다.
  // 오류가 있으면 fallback 컴포넌트가 렌더링되며, 이 fallback 컴포넌트의 프로퍼티로 오류가 전달된다.
  static getDerivedStateFormError(error) {
    return { error }
  }
  
  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;
    if (error) return <ErrorScreen error={error} />
    return children;
  }
}

// 이 컴포넌트 트리에서 발생하는 오류를 포획하고 오류 발생시 fallback 컴포넌트를 렌더링하기 위해 사용할 수 있다.
