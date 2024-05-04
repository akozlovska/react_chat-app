import React from 'react';
import { Heading } from 'theme-ui';

type Props = {
  message: string;
};

const NoItemsFound: React.FC<Props> = ({ message }) => {
  return (
    <Heading
      as="h3"
      sx={{
        p: 3,
        m: 'auto',
        width: 'fit-content',
        borderRadius: '10px',
        bg: 'highlight',
        textAlign: 'center',
      }}
    >
      {message}
    </Heading>
  );
};

export default NoItemsFound;
