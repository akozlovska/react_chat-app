/** @jsxImportSource theme-ui */
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, Button, Divider, Flex, Heading, Label } from 'theme-ui';
import {
  Field,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from 'formik';
import * as Yup from 'yup';
import AnimatedLayout from '../components/AnimatedLayout';
import { useRoom } from '../context/RoomContext';
import { useUser } from '../context/UserContext';
import AnimatedSlideLeft from '../components/AnimatedSlideLeft';
import MembersList from '../components/MembersList';
import ErrorAlert from '../components/ErrorAlert';
import { usePageError } from '../hooks/usePageError';
import { getErrorMessage } from '../utils/getErrorMessage';
import { AnimatePresence } from 'framer-motion';

type RoomEditValues = {
  name: string;
};

const roomEditSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(6, 'Name of the room must be at least 6 characters')
    .max(20, 'Name of the room is too long')
    .required('You must enter new name of the room'),
});

const RoomInfoPage = () => {
  const { roomId } = useParams();
  const { userRooms, renameRoom, deleteRoom, leaveRoom } = useRoom();
  const { user } = useUser();
  const room = useMemo(() => {
    return userRooms.find((room) => room.id === roomId);
  }, [roomId, userRooms]);

  const navigate = useNavigate();

  const [error, setError] = usePageError('');

  const handleLeave = async () => {
    if (roomId) {
      leaveRoom(roomId)
        .then(() => navigate('/profile/rooms'))
        .catch((e) => setError(getErrorMessage(e)));
    }
  };

  const handleEdit = async (
    values: RoomEditValues,
    formikHelpers: FormikHelpers<RoomEditValues>,
  ) => {
    if (roomId) {
      renameRoom(values.name, roomId)
        .then(() => formikHelpers.resetForm())
        .catch((e) => setError(getErrorMessage(e)));
    }
  };

  const handleDelete = async () => {
    if (roomId) {
      deleteRoom(roomId)
        .then(() => navigate('/profile/rooms'))
        .catch((e) => setError(getErrorMessage(e)));
    }
  };

  return (
    <AnimatedLayout>
      <Flex py={4} px={5} sx={{ flexDirection: 'column', gap: '20px' }}>
        <AnimatePresence>
          {!!error && <ErrorAlert message={error} />}
        </AnimatePresence>
        <AnimatedSlideLeft order={1}>
          <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Flex sx={{ alignItems: 'start', gap: '5px' }}>
              <Heading>{room?.name}</Heading>
              {room?.adminId === user?.id && (
                <Badge variant="primary">You are admin</Badge>
              )}
            </Flex>

            {room?.adminId === user?.id ? (
              <Button variant="outline" onClick={handleDelete}>
                Delete room
              </Button>
            ) : (
              <Button variant="outline" onClick={handleLeave}>
                Leave room
              </Button>
            )}
          </Flex>
          <Divider bg="highlight" />
        </AnimatedSlideLeft>

        <AnimatedSlideLeft order={2}>
          <Heading mb={3}>Edit &nbsp; &#128221;</Heading>

          <Formik
            initialValues={{ name: '' }}
            validationSchema={roomEditSchema}
            onSubmit={handleEdit}
            validateOnChange={false}
          >
            {({ errors, touched }: FormikProps<RoomEditValues>) => (
              <Form
                sx={{
                  display: 'grid',
                  columnGap: '20px',
                  gridTemplateColumns: '1fr auto',
                  alignItems: 'center',
                  mb: 4,
                }}
              >
                <Label htmlFor="name" variant="labels.hidden">
                  New Room Name
                </Label>
                <Field
                  name="name"
                  id="name"
                  placeholder="Enter new name for the room"
                  autoComplete="off"
                  sx={{
                    borderRadius: '10px',
                    outlineColor: 'secondary',
                    display: 'block',
                    width: '100%',
                    p: 2,
                    appearance: 'none',
                    fontSize: 'inherit',
                    lineHeight: 'inherit',
                    border: '1px solid',
                    color: 'inherit',
                    bg: 'transparent',
                  }}
                />
                <Button type="submit" sx={{ flexShrink: 0 }}>
                  Save
                </Button>
                <AnimatePresence>
                  {errors.name && touched.name && (
                    <ErrorAlert message={errors.name} />
                  )}
                </AnimatePresence>
              </Form>
            )}
          </Formik>

          <Divider bg="highlight" />
        </AnimatedSlideLeft>

        <AnimatedSlideLeft order={3}>
          <Heading mb={3}>Members &nbsp; &#128101;</Heading>
          {!!room && <MembersList room={room} />}
        </AnimatedSlideLeft>
      </Flex>
    </AnimatedLayout>
  );
};

export default RoomInfoPage;
