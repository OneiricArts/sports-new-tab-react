import React, { ErrorInfo, ReactNode } from 'react';

export class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  };

  message?: ReactNode;

  constructor(props: { message?: ReactNode }) {
    super(props);

    this.message = props.message;
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.message || <span>Something went wrong.</span>;
    }

    return this.props.children;
  }
}
