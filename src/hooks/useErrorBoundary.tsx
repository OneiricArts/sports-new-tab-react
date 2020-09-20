import { useEffect, useState } from 'react';

/**
 * Iteration one
 *
 * Want to be able to throw Errors in async functions that are caught
 * by React ErrorBoundary.
 */
export function useThrowForErrorBoundary() {
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return [setError];
}
