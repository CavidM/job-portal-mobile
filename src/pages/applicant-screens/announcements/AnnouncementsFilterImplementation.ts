import { SpecificationDTO } from '../../../services/user-service/UserService.types';
import { AnnouncementTypes, GenderTypesKeys } from '../../../core/Constants';
import { AnnouncementFilterProps } from './ApplicantAnnouncementsFilter.container';

// @todo define return type

export const getSpecificationsIds = (specifications: SpecificationDTO[]) => specifications?.map(
  (i: SpecificationDTO) => i.id
);

export const getSortedSpecifications = (
  allSpecificationsData: SpecificationDTO[], selectedSpecificationsIds: number[]
) => allSpecificationsData?.reduce(
  (sortedElements: any[], element: SpecificationDTO) => {
    if (selectedSpecificationsIds?.includes(element?.id)) {
      return [element, ...sortedElements];
    }
    return [...sortedElements, element];
  }, []
);

export const getNonEmptyFilterParams = (announcementFilter: AnnouncementFilterProps) => {
  const filterParams = {
    announcementType: announcementFilter?.announcementType !== AnnouncementTypes.SEE_ALL ? announcementFilter?.announcementType : '',
    gender: announcementFilter?.gender !== GenderTypesKeys.BOTH ? announcementFilter?.gender : '',
    minSalary: announcementFilter.isAgreedPrice ? '' : announcementFilter?.minSalary,
    maxSalary: announcementFilter.isAgreedPrice ? '' : announcementFilter?.maxSalary,
    cityId: announcementFilter?.cityId,
    isStarred: announcementFilter?.isStarred,
    specificationsIds: announcementFilter?.specificationsIds?.join()
  };
  Object.keys(filterParams).forEach((key) => filterParams[key] === '' && delete filterParams[key]);
  return filterParams;
};
