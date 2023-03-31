import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from 'react-query';
import ProfessionEdit from './ProfessionEdit.page';
import useForm from '../../../core/form/Form';
import { InformationService } from '../../../services/information-service/Information.service';
import { UserProfessionService } from '../../../services/user-profession-service/UserProfession.service';
import { Labels } from '../../../core/Langs';

interface schemaType {
  profession: string
  specification: string
  experience: string;
  salary: string;
}

interface ProfessionContainerProps {
  route: any,
}

const schema: yup.SchemaOf<schemaType> = yup.object().shape({
  profession: yup.string().required(Labels.enterProfession),
  specification: yup.string().required(Labels.enterSpecification),
  experience: yup.string().required(Labels.enterExperience),
  salary: yup.string().required(Labels.enterSalary)
});

export const ProfessionEditContainer = ({ route }: ProfessionContainerProps) => {
  const informationServices = InformationService();
  const userProfessionService = UserProfessionService();

  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { data: experiences } = informationServices.useGetExperiences();

  const params = { route };

  const { data: professionInformation, isLoading, isFetching } = userProfessionService.useGetProfession(params.route.params.professionId);

  const initialFormData = {
    profession: professionInformation?.data.data.professionDTO.id,
    specification: professionInformation?.data.data.specificationDTO.id,
    experience: professionInformation?.data.data.experience,
    salary: [
      professionInformation?.data.data.minSalary ?? 1, professionInformation?.data.data.maxSalary ?? 5000],
    isAgreedPrice: !!((!professionInformation?.data.data.minSalary & !professionInformation?.data.data.maxSalary))
  };

  const {
    formData, onChange, bulkUpdate
  } = useForm<schemaType>(initialFormData, schema);

  useEffect(() => {
    if (!isLoading) bulkUpdate(initialFormData);
  }, [isLoading, isFetching]);

  const { mutate: deactivate } = UserProfessionService().useDeactivateProfession(params.route.params.professionId);

  const deactivateProfession = () => {
    deactivate(null,
      {
        onSuccess: () => {
          queryClient.invalidateQueries('getUser');
          navigation.goBack();
        }
      });
  };

  const { mutate } = UserProfessionService().useEditProfession();

  const onSubmit = () => {
    const transformedData = {
      experience: formData.experience,
      id: params.route.params.professionId,
      minSalary: formData.isAgreedPrice ? null : formData.salary[0],
      maxSalary: formData.isAgreedPrice ? null : formData.salary[1],
      professionDTO: {
        id: formData.profession
      },
      specificationDTO: {
        id: formData.specification
      }
    };
    mutate(transformedData,
      {
        onSuccess: () => {
          queryClient.invalidateQueries('getUser');
          navigation.goBack();
        }
      });
  };

  return (
    <ProfessionEdit
      experiences={experiences}
      formData={formData}
      onChange={onChange}
      professionInformation={professionInformation?.data.data}
      onSubmit={onSubmit}
      initialFormData={initialFormData}
      deactivateProfession={deactivateProfession}
    />
  );
};
