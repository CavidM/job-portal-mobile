import React from 'react';
import ButtonWithSteps, { ButtonWithStepsProps } from '../../../components/button-steps/ButtonWithSteps';
import { RegistrationContextType, useRegistration } from '../../../context/Registration.context';
import { useRegistrationSteps } from './RegistrationSteps.hook';

interface RegistrationStepsContainerProps {
  initialRoute?: string
}

const RegistrationStepsContainer = ({ initialRoute }: RegistrationStepsContainerProps) => {
  const { userType } = useRegistration() as RegistrationContextType;
  const { handleOnPressNext, step } = useRegistrationSteps(initialRoute);

  let props:ButtonWithStepsProps = {
    onPress: handleOnPressNext,
    title: 'Növbəti',
    step
  };

  if (!userType) {
    props = {
      ...props,
      disabled: true
    };
  }

  return (
    <ButtonWithSteps
      {...props}
      /* onPress={() => {
        console.log(('clik'));
        formState.handleSubmit(onSubmit);
      }} */
    />
  );
};

export default RegistrationStepsContainer;
