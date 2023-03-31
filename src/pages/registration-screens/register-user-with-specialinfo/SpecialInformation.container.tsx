import React, { useEffect } from 'react';
import { useSpecialInformationContext } from './SpecialInformation.context';
import SpecialInformationPage from './SpecialInformation.page';
import { InformationService } from '../../../services/information-service/Information.service';

export const SpecialInformationContainer = () => {
  const {
    formData, errors, onChange, reset
  } = useSpecialInformationContext();
  const informationServices = InformationService();
  const { data: professions } = informationServices.useGetProfessions();
  const { data: experiences } = informationServices.useGetExperiences();
  const { data: specifications } = informationServices.useSpecificationsProfession(
    formData.professionId
  );

  useEffect(() => {
    onChange('specificationId', '');
  }, [formData.professionId]);

  useEffect(()=>{
    reset();
  }, [])

  // return null;
  return (
    <SpecialInformationPage
      formData={formData}
      experiences={experiences?.data?.data ?? []}
      errors={errors}
      onChange={onChange}
      professions={professions?.data?.data ?? []}
      specifications={specifications?.data?.data ?? []}
    />
  );
};
