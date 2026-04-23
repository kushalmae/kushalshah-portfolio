import React from "react";
import { ArrowLeft } from "lucide-react";

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="text-center">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Error</p>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-3">
              Something went wrong.
            </h1>
            <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto">
              {this.state.error?.message ?? "An unexpected error occurred."}
            </p>
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => this.setState({ hasError: false })}
                className="text-xs text-muted-foreground hover:text-foreground tracking-widest uppercase transition-colors"
              >
                Try again
              </button>
              <a
                href="/"
                className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground tracking-widest uppercase transition-colors"
              >
                <ArrowLeft size={14} /> Home
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
