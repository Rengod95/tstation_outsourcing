import React from "react";

export type ErrorState<TError extends Error> = {
  error: TError | undefined;
  hasError: boolean;
};

export type UseErrorBoundaryApi<TError extends Error = Error> = {
  showBoundary: (error: TError) => void;
};

export const useUncaughtErrorHandler = <
  TError extends Error
>(): UseErrorBoundaryApi<TError> => {
  const [errorState, setErrorState] = React.useState<ErrorState<TError>>({
    error: undefined,
    hasError: false,
  });

  const memoized = React.useMemo(
    () => ({
      showBoundary: (error: TError) =>
        setErrorState({
          error,
          hasError: true,
        }),
    }),
    []
  );

  if (errorState.hasError) throw errorState.error;

  return memoized;
};
