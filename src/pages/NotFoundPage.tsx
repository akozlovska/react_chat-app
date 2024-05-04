import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Heading } from 'theme-ui';
import AnimatedLayout from '../components/AnimatedLayout';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <AnimatedLayout>
      <Box
        as="section"
        mx={'auto'}
        pt={'15%'}
        sx={{
          width: '40%',
          textAlign: 'center',
        }}
      >
        <Heading variant="styles.h2" mb={4}>
          Page Not Found
        </Heading>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </Box>
    </AnimatedLayout>
  );
};

export default NotFoundPage;
