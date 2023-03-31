import React from 'react';
import * as yup from 'yup';
import { useQueryClient } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'native-base';
import ProfessionAdd from './ProfessionAdd.page';
import useForm from '../../../core/form/Form';
import { InformationService } from '../../../services/information-service/Information.service';
import { UserProfessionService } from '../../../services/user-profession-service/UserProfession.service';
import normalize from '../../common/styles/normalize';

interface schemaType {
  profession: string
  specification: string
  experience: string;
  salary: any[];
}

const schema: yup.SchemaOf<schemaType> = yup.object()
  .shape({
    profession: yup.string()
      .required('İşi seçin'),
    specification: yup.string()
      .required('Spesifikasiyanı seçin'),
    experience: yup.string()
      .required('Təcrübəni seçin'),
    salary: yup.array()
      .required('Əməkhaqqını daxil edin')
  });

interface ProfessionAddContainerProps {
  onSuccess?: () => void;
}

export const ProfessionAddContainer = (props: ProfessionAddContainerProps) => {
  const { onSuccess } = props;
  const informationServices = InformationService();

  const { data: experiences } = informationServices.useGetExperiences();
  const { data: professions } = informationServices.useGetProfessions();
  const initialFormData = {
    profession: null,
    specification: null,
    experience: null,
    salary: [
      1, 5000],
    isAgreedPrice: false
  };

  const toast = useToast();

  const {
    formData, onChange, errors, handleSubmit
  } = useForm<schemaType>(initialFormData, schema);

  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const {
    data: specifications
  } = informationServices.useSpecificationsProfession(formData?.profession);

  const { mutate } = UserProfessionService()
    .useEditProfession();

  const defaultBehaviourOnSuccess = () => {
    queryClient.invalidateQueries('getUser');
    navigation.goBack();
  };

  const onSubmit = () => handleSubmit(() => {
    const transformedData = {
      experience: formData.experience,
      minSalary: formData.isAgreedPrice ? null : formData.salary[0],
      maxSalary: formData.isAgreedPrice ? null : formData.salary[1],
      professionDTO: {
        id: formData.profession
      },
      specificationDTO: {
        id: formData.specification
      },
      status: "ACTIVE"
    };
    mutate(transformedData,
      {
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
          } else {
            defaultBehaviourOnSuccess();
          }
        },
        // @todo spesific error code must be used
        onError: () => {
          toast.show({
            placement: 'bottom',
            title: 'Qeyd etdiyiniz peşə artıq əlavə edilib',
            status: 'error',
            width: normalize(324)
          });
        }
      });
  });

  return (
    <ProfessionAdd
      navigation={navigation}
      experiences={experiences}
      formData={formData}
      errors={errors}
      onChange={onChange}
      professions={professions}
      specifications={specifications}
      onSubmit={onSubmit}
    />
  );
};
