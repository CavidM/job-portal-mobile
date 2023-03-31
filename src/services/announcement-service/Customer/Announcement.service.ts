import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { HTTP } from '../../../core/http/HttpClient';
import { ServiceResponseWithPagination } from '../../service.types';
import {
  AnnouncementDetailsResponseProps,
  AnnouncementsResponseProps,
  CreateAnnouncementRequestProps
} from './AnnouncmentService.types';
import { AnnouncementTypes } from '../../../core/Constants';

export const AnnouncementService = () => {
  const useGetCustomerAnnouncement = (
    announcementType?: string,
    announcementStatus?: string
  ) => useInfiniteQuery(
    ['/announcements'], ({ pageParam = 0 }) => HTTP.client().get<
            ServiceResponseWithPagination<AnnouncementsResponseProps>
            >(`/announcements?pageSize=10&pageIndex=${pageParam}`,
              { params: { announcementType: announcementType !== AnnouncementTypes.SEE_ALL ? announcementType : '', announcementStatus: announcementStatus !== 'ALL' ? announcementStatus : '' } }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.data) {
          const { totalPages, pageNumber } = lastPage?.data?.data;
          if (pageNumber < totalPages - 1) return pageNumber + 1;
        }
      }
    }
  );
  const useCreateAnnouncement = () => useMutation(createAnnouncement);
  const createAnnouncement = (payload:CreateAnnouncementRequestProps) => HTTP.client().post('/announcements', payload);

  const useGetCustomerAnnouncementDetails = (announcementId: number) => useQuery(
    ['/announcements', announcementId], getAnnouncementDetails
  );
  const getAnnouncementDetails = ({ queryKey }: any) => HTTP.client().get<AnnouncementDetailsResponseProps>(`/announcements/${queryKey[1]}`);

  const useDeleteAnnouncement = () => useMutation(deleteAnnouncement);
  const deleteAnnouncement = (announcementId: number) => HTTP.client().delete(`/announcements/${announcementId}`);

  return {
    useCreateAnnouncement,
    useGetCustomerAnnouncement,
    useGetCustomerAnnouncementDetails,
    useDeleteAnnouncement
  };
};
