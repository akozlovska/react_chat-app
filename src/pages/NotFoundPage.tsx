import React from 'react';
import { Box, Heading } from 'theme-ui';

const NotFoundPage = () => {
  return (
    <Box
      as="section"
      m={'auto'}
      sx={{
        width: '40%',
        textAlign: 'center',
      }}
    >
      <Heading variant="styles.h2">Page Not Found</Heading>
    </Box>
  );
};

export default NotFoundPage;
