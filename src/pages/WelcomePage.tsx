/** @jsxImportSource theme-ui */
import { Field, Form, Formik, FormikProps } from 'formik';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading, Text, Box, Label, Button } from 'theme-ui';
import * as Yup from 'yup';
import ErrorAlert from '../components/ErrorAlert';
import { useUser } from '../context/UserContext';
import { usePageError } from '../hooks/usePageError';
import { getErrorMessage } from '../utils/getErrorMessage';

type AuthorizationValues = {
  username: string;
};

const authorizationSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .min(8, 'Your username must be at least 8 characters')
    .max(16, 'Your username is too long')
    .matches(
      /^[a-zA-Z0-9]+$/,
      'Your username must contain only letters or numbers',
    )
    .required('You must enter your username to proceed'),
});

const WelcomePage = () => {
  const { authorize } = useUser();
  const navigate = useNavigate();

  const [error, setError] = usePageError('');

  const handleSubmit = async (values: AuthorizationValues) => {
    authorize(values.username)
      .then(() => navigate('profile'))
      .catch((e) => setError(getErrorMessage(e)));
  };

  return (
    <Box
      as="section"
      m={'auto'}
      sx={{
        width: '40%',
        textAlign: 'center',
      }}
    >
      <Heading variant="styles.h2">Welcome to React Chat App</Heading>
      <Text>Please, enter your username to continue</Text>
      <Box p={4}>
        <Formik
          initialValues={{ username: '' }}
          validationSchema={authorizationSchema}
          onSubmit={handleSubmit}
          validateOnChange={false}
        >
          {({ errors, touched }: FormikProps<AuthorizationValues>) => (
            <Form>
              <Label htmlFor="username" variant="labels.hidden">
                Username
              </Label>
              <Field
                name="username"
                id="username"
                placeholder="Enter your username"
                autoComplete="username"
                sx={{
                  borderRadius: '10px',
                  outlineColor: 'secondary',
                  display: 'block',
                  width: '100%',
                  p: 2,
                  mb: 3,
                  appearance: 'none',
                  fontSize: 'inherit',
                  lineHeight: 'inherit',
                  border: '1px solid',
                  color: 'inherit',
                  bg: 'transparent',
                }}
              />
              <AnimatePresence>
                {errors.username && touched.username && (
                  <ErrorAlert message={errors.username} />
                )}
              </AnimatePresence>
              <Button type="submit">Continue</Button>
            </Form>
          )}
        </Formik>
        <AnimatePresence>
          {!!error && <ErrorAlert message={error} />}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default WelcomePage;
