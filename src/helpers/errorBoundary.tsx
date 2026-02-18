'use client';

import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }: any) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error: any) => {
      setHasError(true);
      console.error('Error caught in ErrorBoundary:', error);
    };

    window.addEventListener('error', errorHandler);
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError) {
    return <div>Something went wrong, please try again later.</div>;
  }

  return children;
};

export default ErrorBoundary;
