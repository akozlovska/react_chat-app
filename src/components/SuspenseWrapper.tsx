import { QueryErrorResetBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, Flex, Text } from 'theme-ui';
import Loader from './Loader';

type Props = {
  children: React.ReactNode;
};

const SuspenseWrapper: React.FC<Props> = ({ children }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <Flex
              p={3}
              m="auto"
              sx={{
                bg: 'highlight',
                borderRadius: '10px',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <Text>Something went wrong</Text>
              <Button variant="outline" onClick={() => resetErrorBoundary()}>
                Try again
              </Button>
            </Flex>
          )}
        >
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default SuspenseWrapper;
