import React from 'react';
import { useSelector } from 'react-redux';
import GeneralInformationPage from './GeneralInformation.page';
import {
  GeneralInformationFormContextType,
  useGeneralInformationContext
} from './GeneralInformation.context';
import { InformationService } from '../../../services/information-service/Information.service';
import { registrationFlowSelectors } from '../../../store/slices/registrationFlow.slice';

export const GeneralInformationContainer = () => {
  // (route?.params?.flow !== 'asan')
  const {
    errors, onChange, reset, formData
  } = useGeneralInformationContext() as GeneralInformationFormContextType;
  const informationServices = InformationService();
  const { data: cities } = informationServices.useGetCities();

  const isDisabledDmaForm = useSelector(registrationFlowSelectors.getGeneralInfoFormIsDisabled);
  const birthDate = useSelector(registrationFlowSelectors.getIsBirthdayInputShow);

  const genderList = [{
    label: 'Qadın',
    value: 'FEMALE'
  },
  {
    label: 'Kişi',
    value: 'MALE'
  }];

  return (
    <GeneralInformationPage
      errors={errors}
      onChange={onChange}
      genderList={genderList}
      cityList={cities?.data.data ?? []}
      onComponentUnmount={() => reset()}
      formData={formData}
      birthDate={birthDate}
      isDisabledDmaForm={isDisabledDmaForm}
    />
  );
};
