import React from 'react';
import { IconButton, Image } from 'theme-ui';

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon: string;
};

const IconBtn: React.FC<Props> = ({ onClick, icon }) => {
  return (
    <IconButton
      sx={{ p: '4px', width: '42px', height: '42px', flexShrink: 0 }}
      onClick={onClick}
    >
      <Image src={icon} variant="avatar" sx={{ cursor: 'pointer' }} />
    </IconButton>
  );
};

export default IconBtn;
