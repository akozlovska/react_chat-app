import React from 'react';
import { Flex, Spinner } from 'theme-ui';

const Loader = () => {
  return (
    <Flex
      sx={{
        pt: 4,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner
        size={64}
        duration={1000}
        strokeWidth={5}
        sx={{ color: 'primary' }}
      />
    </Flex>
  );
};

export default Loader;
