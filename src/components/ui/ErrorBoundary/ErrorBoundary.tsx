import { Component, type ReactNode, type ErrorInfo } from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[ErrorBoundary${this.props.sectionName ? ` – ${this.props.sectionName}` : ''}]`, error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className={styles.fallback} role="alert">
          <p className={styles.message}>
            {this.props.sectionName
              ? `The ${this.props.sectionName} section encountered an error.`
              : 'Something went wrong loading this section.'}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
