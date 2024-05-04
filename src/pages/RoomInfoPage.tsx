/** @jsxImportSource theme-ui */
import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Badge, Button, Divider, Flex, Heading, Label } from 'theme-ui';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';
import AnimatedLayout from '../components/AnimatedLayout';
import { useUser } from '../context/UserContext';
import AnimatedSlideLeft from '../components/AnimatedSlideLeft';
import MembersList from '../components/MembersList';
import ErrorAlert from '../components/ErrorAlert';
import { usePageError } from '../hooks/usePageError';
import { AnimatePresence } from 'framer-motion';
import {
  useDeleteRoom,
  useEditRoom,
  useLeaveRoom,
  useUserRooms,
} from '../api/queries/roomQueries';
import SuspenseWrapper from '../components/SuspenseWrapper';

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
  const { user } = useUser();
  const userRoomsQuery = useUserRooms();
  const room = useMemo(
    () => userRoomsQuery.data?.find((room) => room.id === roomId),
    [userRoomsQuery.data, roomId],
  );

  const [pageError, setPageError] = usePageError();

  const leaveRoomMutation = useLeaveRoom();
  const editRoomMutation = useEditRoom();
  const deleteRoomMutation = useDeleteRoom();

  const handleLeave = async () => {
    if (roomId && user) {
      leaveRoomMutation.mutate({ roomId, userId: user.id });
    }
  };

  const handleEdit = async (
    values: RoomEditValues,
    formikHelpers: FormikHelpers<RoomEditValues>,
  ) => {
    if (roomId) {
      editRoomMutation
        .mutateAsync({ name: values.name, roomId })
        .then(() => formikHelpers.resetForm());
    }
  };

  const handleDelete = async () => {
    if (roomId) {
      deleteRoomMutation.mutate(roomId);
    }
  };

  useEffect(() => {
    if (leaveRoomMutation.error) {
      setPageError(leaveRoomMutation.error);
    }
  }, [leaveRoomMutation.error]);

  useEffect(() => {
    if (editRoomMutation.error) {
      setPageError(editRoomMutation.error);
    }
  }, [editRoomMutation.error]);

  useEffect(() => {
    if (deleteRoomMutation.error) {
      setPageError(deleteRoomMutation.error);
    }
  }, [deleteRoomMutation.error]);

  return (
    <AnimatedLayout>
      <Flex py={4} px={5} sx={{ flexDirection: 'column', gap: '20px' }}>
        <AnimatePresence>
          {!!pageError && <ErrorAlert message={pageError} />}
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
              <Button
                variant="outline"
                disabled={deleteRoomMutation.isPending}
                onClick={handleDelete}
              >
                Delete room
              </Button>
            ) : (
              <Button
                variant="outline"
                disabled={leaveRoomMutation.isPending}
                onClick={handleLeave}
              >
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
                <Button
                  type="submit"
                  disabled={editRoomMutation.isPending}
                  sx={{ flexShrink: 0 }}
                >
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
          <SuspenseWrapper>
            {!!room && <MembersList room={room} />}
          </SuspenseWrapper>
        </AnimatedSlideLeft>
      </Flex>
    </AnimatedLayout>
  );
};

export default RoomInfoPage;
