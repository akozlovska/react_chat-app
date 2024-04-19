import { motion } from 'framer-motion';
import React from 'react';
import { Alert } from 'theme-ui';
import { alertAnimation } from '../utils/animations';

type Props = {
  message: string;
};

const ErrorAlert: React.FC<Props> = ({ message }) => {
  return (
    <motion.div
      variants={alertAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      key="errorAlert"
    >
      <Alert variant="error" my={3} mx={3} sx={{ justifyContent: 'center' }}>
        {message}
      </Alert>
    </motion.div>
  );
};

export default ErrorAlert;
