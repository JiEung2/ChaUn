import { Component, ErrorInfo, ReactNode } from 'react';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    // 에러가 발생하면 hasError 상태를 true로 설정
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러 로그를 기록할 수 있는 부분
    console.error('에러 로그: ', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 에러가 발생했을 때 사용자에게 보여줄 UI
      return (
        <h2
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
          }}>
          문제가 발생했습니다. <br />
          잠시 후 다시 시도해주세요.
        </h2>
      );
    }

    // 에러가 없을 때는 자식 컴포넌트를 렌더링
    return this.props.children;
  }
}

export default ErrorBoundary;
