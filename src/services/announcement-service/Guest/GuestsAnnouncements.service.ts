import { useInfiniteQuery } from 'react-query';
import { HTTP } from '../../../core/http/HttpClient';
import { ServiceResponseWithPagination } from '../../service.types';
import { ApplicantAnnouncementsResponseProps } from '../Applicant/ApplicantAnnouncmentService.types';

export const AnnouncementService = () => {
  const useGetGuestAnnouncement = (
  ) => useInfiniteQuery(
    ['/guest-announcements'], ({ pageParam = 0 }) => HTTP.client().get<
            ServiceResponseWithPagination<ApplicantAnnouncementsResponseProps>
            >(`/user-announcements/public?pageSize=10&pageIndex=${pageParam}`),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.data) {
          const { totalPages, pageNumber } = lastPage?.data?.data;
          if (pageNumber < totalPages - 1) return pageNumber + 1;
        }
      }
    }
  );

  return {
    useGetGuestAnnouncement
  };
};
