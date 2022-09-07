import { Component } from 'react';

import { IChildrenProp } from '@/types/common';

function ErrorFallbackUI({ errorMessage }) {
  return (
    <div className="article-error">
      <h3>There was a problem displaying the article:</h3>
      <h3 className="error">{errorMessage}</h3>
    </div>
  );
}

class ErrorBoundary extends Component<IChildrenProp> {
  state = { error: false, errorMessage: '' };

  static getDerivedStateFromError(error) {
    // Update state to render the fallback UI
    return { error: true, errorMessage: error.toString() };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to an error reporting service like Sentry
    console.log({ error, errorInfo });
  }

  render() {
    const { error, errorMessage } = this.state;
    const { children } = this.props;

    return error ? <ErrorFallbackUI {...{ error, errorMessage }} /> : children;
  }
}

export default ErrorBoundary;
