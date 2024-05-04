/** @jsxImportSource theme-ui */
import React, { useEffect, useRef } from 'react';
import { Label } from 'theme-ui';
import { Field, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { AnimatePresence } from 'framer-motion';
import ErrorAlert from './ErrorAlert';

export type UpdatedMessageValues = {
  updatedMessage: string;
};

const messageFieldSchema = Yup.object().shape({
  updatedMessage: Yup.string().trim().min(1).max(200).required(),
});

type Props = {
  initialMessage: string;
  onSubmit: (values: UpdatedMessageValues) => void;
  ref: React.LegacyRef<FormikProps<UpdatedMessageValues>>;
};

const EditMessageForm: React.FC<Props> = React.forwardRef<
  FormikProps<UpdatedMessageValues>,
  Props
>(function EditMessageForm({ initialMessage, onSubmit }, formRef) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        initialMessage.length,
        initialMessage.length,
      );
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, []);

  return (
    <Formik
      initialValues={{ updatedMessage: initialMessage }}
      validationSchema={messageFieldSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
      innerRef={formRef}
    >
      {({ errors, touched }: FormikProps<UpdatedMessageValues>) => (
        <Form>
          <Label htmlFor="updatedMessage" variant="labels.hidden">
            Edit message
          </Label>
          <Field
            as="textarea"
            name="updatedMessage"
            innerRef={textareaRef}
            maxLength={200}
            sx={{
              width: '100%',
              border: 'none',
              outline: 'none',
              resize: 'none',
              font: 'inherit',
              background: 'transparent',
              scrollBehavior: 'smooth',
            }}
          />

          <AnimatePresence>
            {errors.updatedMessage && touched.updatedMessage && (
              <ErrorAlert message={errors.updatedMessage} />
            )}
          </AnimatePresence>
        </Form>
      )}
    </Formik>
  );
});

export default EditMessageForm;
