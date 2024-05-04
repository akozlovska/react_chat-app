/** @jsxImportSource theme-ui */
import { Field, Form, Formik, FormikProps } from 'formik';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import { Heading, Text, Box, Label, Button } from 'theme-ui';
import * as Yup from 'yup';
import { useAuthorize } from '../api/queries/userQueries';
import AnimatedLayout from '../components/AnimatedLayout';
import ErrorAlert from '../components/ErrorAlert';
import { usePageError } from '../hooks/usePageError';

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
  const [pageError, setPageError] = usePageError();

  const { mutate, error, isPending } = useAuthorize();

  const handleAuthorize = async (values: AuthorizationValues) => {
    mutate(values.username);
  };

  useEffect(() => {
    if (error) {
      setPageError(error);
    }
  }, [error]);

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
        <Heading variant="styles.h2">Welcome to React Chat App</Heading>
        <Text>Please, enter your username to continue</Text>
        <Box p={4}>
          <Formik
            initialValues={{ username: '' }}
            validationSchema={authorizationSchema}
            onSubmit={handleAuthorize}
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
                <Button type="submit" disabled={isPending}>
                  Continue
                </Button>
              </Form>
            )}
          </Formik>
          <AnimatePresence>
            {!!pageError && <ErrorAlert message={pageError} />}
          </AnimatePresence>
        </Box>
      </Box>
    </AnimatedLayout>
  );
};

export default WelcomePage;
