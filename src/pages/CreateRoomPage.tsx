/** @jsxImportSource theme-ui */
import React from 'react';
import { Field, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Heading, Box, Label, Button, Flex, Text } from 'theme-ui';
import { useRoom } from '../context/RoomContext';
import AnimatedLayout from '../components/AnimatedLayout';
import ErrorAlert from '../components/ErrorAlert';
import { usePageError } from '../hooks/usePageError';
import { getErrorMessage } from '../utils/getErrorMessage';
import { AnimatePresence } from 'framer-motion';

type NewRoomValues = {
  name: string;
};

const CreateRoomPage = () => {
  const { createRoom } = useRoom();
  const navigate = useNavigate();

  const [error, setError] = usePageError('');

  const NewRoomSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(6, 'Name of the room must be at least 6 characters')
      .max(20, 'Name of the room is too long')
      .required('You must enter  a name of the new room'),
  });

  const handleCreate = async (values: NewRoomValues) => {
    createRoom(values.name)
      .then((newRoom) => navigate(`/profile/rooms/${newRoom.id}`))
      .catch((e) => setError(getErrorMessage(e)));
  };

  return (
    <AnimatedLayout>
      <Flex
        m="auto"
        sx={{
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          maxWidth: '400px',
        }}
      >
        <Text sx={{ fontSize: 5 }}>&#128236;</Text>
        <Heading variant="styles.h2">Create new room</Heading>
        <Box p={4}>
          <Formik
            initialValues={{ name: '' }}
            validationSchema={NewRoomSchema}
            onSubmit={handleCreate}
            validateOnChange={false}
          >
            {({ errors, touched }: FormikProps<NewRoomValues>) => (
              <Form>
                <Label htmlFor="name" variant="labels.hidden">
                  Room Name
                </Label>
                <Field
                  name="name"
                  id="name"
                  placeholder="Enter the name for the room"
                  autoComplete="off"
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
                  {errors.name && touched.name && (
                    <ErrorAlert message={errors.name} />
                  )}
                </AnimatePresence>
                <Button type="submit">Create</Button>
              </Form>
            )}
          </Formik>
          <AnimatePresence>
            {!!error && <ErrorAlert message={error} />}
          </AnimatePresence>
        </Box>
      </Flex>
    </AnimatedLayout>
  );
};

export default CreateRoomPage;
