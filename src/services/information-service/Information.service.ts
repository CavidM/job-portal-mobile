import { useQuery } from 'react-query';
import { HTTP } from '../../core/http/HttpClient';
import {
  CityServiceResponseProps,
  InformationProfessionResponse,
  InformationExperienceResponse
} from './InformationService.types';
import { SpecificationDTO } from '../user-service/UserService.types';

export function InformationService() {
  const getCities = () => HTTP.client().get<CityServiceResponseProps>('/information/cities');
  const getExperiences = () => HTTP.client().get<InformationExperienceResponse>('/information/experiences');
  const getProfessions = () => HTTP.client().get<InformationProfessionResponse>('/information/professions');
  const getSearchProfession = ({ queryKey }: any) => HTTP
    .client()
    .get<InformationProfessionResponse>(
      '/information/professions',
      { params: { name: queryKey[1] } }
    );
  const getSpecificationsProfession = (professionId: number) => HTTP.client().get(`/information/specifications/profession/${professionId}`);
  const getSpecifications = ({ queryKey }: any) => HTTP.client().get<SpecificationDTO>('/information/specifications/spec', { params: { name: queryKey[1] } });
  const useGetCities = () => useQuery('/information/cities', getCities);
  const useGetProfessions = () => useQuery(['/information/professions'], getProfessions);
  const useGetExperiences = () => useQuery(['/information/experiences'], getExperiences);
  const useGetSearchProfessions = (search: string = '') => useQuery(['/information/search-profession', search], getSearchProfession);
  const useSpecificationsProfession = (professionId: number) => useQuery(
    ['/information/specifications/profession/', professionId],
    () => getSpecificationsProfession(professionId),
    {
      enabled: !!professionId
    }
  );
  const useGetSpecifications = (searchValue: string = '') => useQuery(['/information/specifications', searchValue],
      getSpecifications, {enabled: Boolean(searchValue), cacheTime: 100});

  return {
    useGetCities,
    useGetProfessions,
    useGetExperiences,
    useSpecificationsProfession,
    useGetSearchProfessions,
    useGetSpecifications
  };
}
