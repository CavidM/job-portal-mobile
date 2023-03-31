import React, { useState, useEffect } from 'react';
import * as yup from 'yup';

export type inputOnChangeType = (field: string, value: any) => void

// @todo Add generic type. should know about form schema types
const createErrorObject = (errors: yup.ValidationError) => errors.inner.reduce(
  (newErrorObject, errorItem) => ({
    ...newErrorObject,
    [errorItem.path as string]: errorItem.message
  }),
  {}
);

export default function useForm<T>(
  data: T,
  formSchema?: yup.SchemaOf<T>
) {
  const [formData, setFormData] = useState<Partial<T>>(data || {});
  // @todo should remove boolean type on errors field
  const [errors, setFormErrors] = useState<Partial<T> | boolean>(false);
  const [wasValidated, setWasValidated] = useState(false);

  const validateFn = (newFormData = formData) => {
    let newErrors: object | boolean = false;

    try {
      formSchema?.validateSync(newFormData, { abortEarly: false });
    } catch (e) {
      newErrors = createErrorObject(e);
      if (Object.keys(newErrors).length > 0) {
        setFormErrors(newErrors);
      }
    }

    if (!newErrors) {
      setFormErrors(false);
    }

    setWasValidated(true);

    return newErrors;
  };

  const validate = React.useCallback(validateFn, [formData]);

  // @todo. add field types.
  const onChange: inputOnChangeType = (field: keyof T, value) => {
    const newValue = {
      [field]: data[field]
    };

    if (value !== null) {
      newValue[field] = value;
    }

    const newState = {
      ...formData,
      ...newValue
    };

    setFormData(newState);

    if (wasValidated) {
      validate(newState);
    }
  };

  const bulkUpdate = (data: T) => {
    setFormData(data);
  };

  const handleSubmit = (cb: (formData: T) => void) => {
    const error = validate();

    if (!error) {
      cb(formData);
    }
  };

  const reset = () => {
    setFormData(data);
    setFormErrors(false);
    setWasValidated(false)
  };

  return {
    formData, onChange, validate, errors, handleSubmit, reset, bulkUpdate
  };
}
