import React from 'react';
import { motion } from 'framer-motion';
import { outletAnimation } from '../utils/animations';

type Props = {
  children: React.ReactNode;
};

const AnimatedLayout: React.FC<Props> = ({ children }) => {
  return (
    <motion.article
      variants={outletAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5, type: 'easeInOut' }}
      style={{ height: '100%', width: '100%' }}
    >
      {children}
    </motion.article>
  );
};

export default AnimatedLayout;
