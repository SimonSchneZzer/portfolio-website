import { Component } from 'react';
import styles from './ErrorBoundary.module.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Hier könnte man auch einen Error-Tracking-Service wie Sentry einbinden
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer}>
          <h2>Oops, etwas ist schiefgelaufen!</h2>
          <p>Bitte lade die Seite neu oder versuche es später erneut.</p>
          <button
            className={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            Seite neu laden
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details className={styles.errorDetails}>
              <summary>Fehlerdetails</summary>
              <pre>{this.state.error?.toString()}</pre>
              <pre>{this.state.errorInfo?.componentStack}</pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 