import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';

const AnimatedRootOutlet = () => {
  const location = useLocation();
  const element = useOutlet();
  const key = location.pathname.split('/')[1];

  return (
    <AnimatePresence mode="wait" initial={true}>
      {element && React.cloneElement(element, { key })}
    </AnimatePresence>
  );
};

export default AnimatedRootOutlet;
