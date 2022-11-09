import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';

const BreakingThings = () => {
  throw new Error("we intentionally broke something");
}

const SiteLayout = ({ children, menu = c => null }) => {
  return (
    <div className="site-container">
      <div>{menu}</div>
      <div>{children}</div>
    </div>
  );
}

const Menu = () => (
  <ErrorBoundary>
    <p style={{ color: "white" }}>TODO: Build Menu</p>
  </ErrorBoundary>
);

const Callout = ({ children }) => (
  <ErrorBoundary>
    <p>{children}</p>
  </ErrorBoundary>
)

// Main은 현재 사이트의 레이아웃이 렌더링되는 위치다.
// App 컴포넌트를 변경해서 사용자가 동의할 때까지 Agreement를 표시하도록 하고
// 사용자가 동의하면 Agreement 마운트를 해제하고 Main 웹사이트 컴포넌트를 렌더링한다.
function Main() {
  return (
    <SiteLayout menu={<Menu />}>
      <Callout>Welcome to the site</Callout>
      <ErrorBoundary>
        <h1>TODO: Home Page</h1>
        <p>Complete the main contents for this home page</p>
      </ErrorBoundary>
    </SiteLayout>
  );
}

export default Main;