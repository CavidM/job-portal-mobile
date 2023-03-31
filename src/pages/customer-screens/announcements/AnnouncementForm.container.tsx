import { View } from 'react-native';
import React from 'react';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'native-base';
import { useSelector } from 'react-redux';
import { useQueryClient } from 'react-query';
import { AnnouncementFormPage } from './AnnouncementForm.page';
import { InformationService } from '../../../services/information-service/Information.service';
import useForm from '../../../core/form/Form';
import { AppScreens } from '../../../routes/Navigator.types';
import { AnnouncementService } from '../../../services/announcement-service/Customer/Announcement.service';
import normalize from '../../common/styles/normalize';
import { createOrderPayloadSelectors } from '../../../store/slices/createOrderPayload';
import { orderUserSearchParamsSelector } from '../../../store/slices/orderUsersSearchParams.slice';
import { AnnouncementTypes, GenderTypesKeys } from '../../../core/Constants';
import { localISOTime } from '../../../core/localISOTime';

export interface AnnouncementFormProps {
  announcementType: string,
  description: string,
  phoneNumber: string,
  emailAddress: string,
  cityId: number
  maxSalary: number,
  minSalary: number,
  isAgreedPrice: boolean,
  maxAge: number,
  minAge: number,
  genderType: string,
  deadlineDate: string,
  salary: [number, number],
  age: [number, number]
  }

const initialFormData:AnnouncementFormProps = {
  announcementType: AnnouncementTypes.SEE_ALL,
  description: '',
  phoneNumber: '',
  emailAddress: '',
  cityId: 0,
  isAgreedPrice: false,
  genderType: GenderTypesKeys.BOTH,
  deadlineDate: '',
  salary: [0, 5000],
  age: [18, 99]
};

const formDataSchema: yup.SchemaOf<AnnouncementFormProps> = yup.object().shape({
  announcementType: yup.string(),
  description: yup.string().required('job description is required'),
  phoneNumber: yup.string().required('phone number is required').min(13, 'Mobil nömrə 9 rəqəmdən az olmamalıdır'),
  emailAddress: yup.string().email('email format is not supported'),
  cityId: yup.number().min(1).required('city is required'),
  isAgreedPrice: yup.boolean(),
  genderType: yup.string(),
  deadlineDate: yup.string().test('deadlineDate', 'the deadline should not be earlier than today', (val) => Date.parse(localISOTime.slice(0, 10)) <= Date.parse(val)).required('deadline is required'),
  salary: yup.array(),
  age: yup.array()
});

export const AnnouncementFormContainer = () => {
  const informationService = InformationService();
  const navigation = useNavigation();
  const requestParams = useSelector(orderUserSearchParamsSelector.getParams);

  const { data: cities } = informationService.useGetCities();

  const {
    formData, onChange, errors, handleSubmit
  } = useForm(initialFormData, formDataSchema);

  const onChangeFormData = (field: string, value: any) => {
    onChange(field, value);
  };
  const createOrderPayload = useSelector(createOrderPayloadSelectors.getState);
  const queryClient = useQueryClient();
  const toast = useToast();
  const { mutate } = AnnouncementService().useCreateAnnouncement();
  const onSubmit = () => handleSubmit((values) => {
    const formValues = {
      announcementType: values.announcementType !== AnnouncementTypes.SEE_ALL
        ? values.announcementType : null,
      cityDTO: {
        id: values.cityId
      },
      deadlineDate: values.deadlineDate,
      description: values.description,
      emailAddress: values.emailAddress,
      genderType: values.genderType !== GenderTypesKeys.BOTH ? values.genderType : null,
      locationPayload: createOrderPayload.location,
      maxAge: values?.age[1],
      maxSalary: values.isAgreedPrice ? null : values?.salary[1],
      minAge: values?.age[0],
      minSalary: values.isAgreedPrice ? null : values?.salary[0],
      phoneNumber: values?.phoneNumber,
      professionDTO: {
        id: requestParams.userSearchPayload.professionId
      },
      specificationDTO: {
        id: requestParams.userSearchPayload.specificationId
      }
    };

    mutate(formValues, {
      onSuccess: () => {
        queryClient.invalidateQueries('/announcements');
        navigation.navigate(AppScreens.CustomerAnnouncements);
      },
      onError: () => {
        toast.show({
          placement: 'bottom',
          title: 'Xəta baş verdi',
          status: 'error',
          width: normalize(324)
        });
      }
    });
  });
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start'
    }}
    >
      <AnnouncementFormPage
        cities={cities?.data.data ?? []}
        formData={formData}
        onChangeFormData={onChangeFormData}
        onSubmit={onSubmit}
        errors={errors}
      />
    </View>
  );
};
