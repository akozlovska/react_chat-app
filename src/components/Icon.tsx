import React from 'react';
import { Flex, Image } from 'theme-ui';

type Props = {
  icon: string;
};

const Icon: React.FC<Props> = ({ icon }) => {
  return (
    <Flex sx={{ p: '4px', width: '42px', height: '42px', flexShrink: 0 }}>
      <Image src={icon} variant="avatar" sx={{ cursor: 'pointer' }} />
    </Flex>
  );
};

export default Icon;
