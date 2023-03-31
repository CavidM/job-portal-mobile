import React from 'react';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import useForm from '../../../core/form/Form';
import { UserService } from '../../../services/user-service/User.service';
import PhoneNumberEdit from './PhoneNumberEdit.page';

interface schemaType {
  phone: string
}

const schema: yup.SchemaOf<schemaType> = yup.object().shape({
  phone: yup.string().required()
});

export const PhonenumbereditContainer = ({ route }: any) => {
  const navigation = useNavigation();

  const { mutate } = UserService().useEditPhoneNumber();

  const initialFormData = {
    phone: ''
  };

  const {
    formData, onChange, errors, handleSubmit
  } = useForm<schemaType>(initialFormData, schema);

  const onSubmit = () => handleSubmit(() => {
    if (route.params !== formData.phone) {
      mutate({
        phoneNumber: formData.phone
      }, {
        onSuccess: () => {
          navigation.navigate('EditPhoneNumberVerificationOtp');
        }
      });
    }
  });

  return (
    <PhoneNumberEdit
      formData={formData}
      onChange={onChange}
      onSubmitChange={onSubmit}
      currentPhoneNumber={route.params}
      errors={errors}
    />
  );
};
