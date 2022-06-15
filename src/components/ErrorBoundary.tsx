import React, { ErrorInfo, ReactNode } from 'react';

type Props = {
  message?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  children?: ReactNode;
};

export class ErrorBoundary extends React.Component<Props> {
  state = {
    hasError: false
  };

  message?: ReactNode;

  constructor(props: Props) {
    super(props);

    this.message = props.message;
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.message || <span>Something went wrong.</span>;
    }

    return this.props.children;
  }
}
