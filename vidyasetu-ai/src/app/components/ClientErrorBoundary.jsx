"use client";

import React from "react";

export default class ClientErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log to console for now — can be extended to remote logging
    // Keep messages concise to avoid flooding logs
    console.error("ClientErrorBoundary caught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-transparent">
          {/* benign fallback so layout remains intact */}
        </div>
      );
    }

    return this.props.children;
  }
}
