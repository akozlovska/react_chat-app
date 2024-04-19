import React from 'react';
import { motion } from 'framer-motion';
import { slideLeftAnimation } from '../utils/animations';

type Props = {
  order: number;
  children: React.ReactNode;
};

const AnimatedSlideLeft: React.FC<Props> = ({ order, children }) => {
  return (
    <motion.div
      variants={slideLeftAnimation}
      initial="hidden"
      animate="staggeredVisible"
      custom={order}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSlideLeft;
