import { useController, useFormContext } from 'react-hook-form';
import React from 'react';
import Input from './Input';

export const FormInput = (props:any) => {
  const {
    name, rules, defaultValue = '', ...inputProps
  } = props;

  const formContext = useFormContext();
  const { control, formState: { errors } } = formContext;

  const { field } = useController({
    name, control, rules, defaultValue
  });

  return (
    <Input
      {...inputProps}
      error={errors[name]?.message}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
    />
  );
};
