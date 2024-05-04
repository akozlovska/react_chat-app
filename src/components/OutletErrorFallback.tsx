import React from 'react';
import { Box, Button, Heading } from 'theme-ui';

const OutletErrorFallback = () => {
  const reload = () => {
    location.reload();
  };

  return (
    <Box
      as="section"
      mx={'auto'}
      pt={'15%'}
      sx={{
        width: '40%',
        textAlign: 'center',
      }}
    >
      <Heading variant="styles.h2" mb={3}>
        Something went wrong
      </Heading>
      <Button variant="outline" onClick={reload}>
        Refresh
      </Button>
    </Box>
  );
};

export default OutletErrorFallback;
