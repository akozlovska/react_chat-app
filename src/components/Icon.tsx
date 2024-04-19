import React from 'react';
import { IconButton, Image } from 'theme-ui';

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon: string;
};

const Icon: React.FC<Props> = ({ onClick, icon }) => {
  return (
    <IconButton
      sx={{ width: '42px', height: '42px', flexShrink: 0 }}
      onClick={onClick}
    >
      <Image src={icon} variant="avatar" sx={{ cursor: 'pointer' }} />
    </IconButton>
  );
};

export default Icon;
