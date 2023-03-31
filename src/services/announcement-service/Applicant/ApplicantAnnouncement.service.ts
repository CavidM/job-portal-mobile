import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { HTTP } from '../../../core/http/HttpClient';
import { ServiceResponseWithPagination } from '../../service.types';
import {
  ApplicantAnnouncementsResponseProps
} from './ApplicantAnnouncmentService.types';

export const AnnouncementService = () => {
  const useGetApplicantAnnouncement = (
  ) => useInfiniteQuery(
    ['/user-announcements'], ({ pageParam = 0 }) => HTTP.client().get<
            ServiceResponseWithPagination<ApplicantAnnouncementsResponseProps>
            >(`/user-announcements?pageSize=10&pageIndex=${pageParam}`),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.data) {
          const { totalPages, pageNumber } = lastPage?.data?.data;
          if (pageNumber < totalPages - 1) return pageNumber + 1;
        }
      }
    }
  );
  const useGetFilteredApplicantAnnouncement = (
      announcementFilter?: {}
  ) => useInfiniteQuery(
      ['/user-filtered-announcements'], ({ pageParam = 0 }) => HTTP.client().get<
          ServiceResponseWithPagination<ApplicantAnnouncementsResponseProps>
          >(`/user-announcements?pageSize=10&pageIndex=${pageParam}`, {
        params: announcementFilter
      }),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.data?.data) {
            const { totalPages, pageNumber } = lastPage?.data?.data;
            if (pageNumber < totalPages - 1) return pageNumber + 1;
          }
        }
      }
  );

  const useStarAnnouncement = () => useMutation(starAnnouncement);
  const starAnnouncement = (announcementId: number) => HTTP.client().put(`/user-announcements/star/${announcementId}`);

  const useGetAnnouncementSpecificationList = () => useQuery('/announcement-profession-specifications', getAnnouncementSpecifications);
  const getAnnouncementSpecifications = () => HTTP.client().get('/announcement-profession-specifications');

  const useAddAnnouncementSpecification = () => useMutation(addAnnouncementSpecification);
  const addAnnouncementSpecification = (specificationId: number) => HTTP.client().post(`/announcement-profession-specifications/${specificationId}`);

  const useDeleteAnnouncementSpecification = () => useMutation(deleteAnnouncementSpecification);
  const deleteAnnouncementSpecification = (announcementId: number) => HTTP.client().delete(`/announcement-profession-specifications/${announcementId}`);
  return {
    useGetApplicantAnnouncement,
    useStarAnnouncement,
    useGetAnnouncementSpecificationList,
    useAddAnnouncementSpecification,
    useDeleteAnnouncementSpecification,
    useGetFilteredApplicantAnnouncement
  };
};
