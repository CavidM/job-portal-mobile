import { createServer, Request, Response } from 'miragejs';
import { Server } from 'miragejs/server';
import {
  getInformationSpecifications,
  informationCities,
  informationProfessions, informationSearchProfession,
  informationSpecificationsProfession, informationExperiences
} from './controller/Information.controller';
import {
  getUser, postUser, putUser, registerViaAsan, switchUser
} from './controller/user/User.controller';
import { getUserPhoto, postUserPhoto } from './controller/UserPhoto.controller';
import { authRequest, refreshToken, validateToken } from './controller/AuthController';
import {
  createOrder,
  getOrderUsersBySearchParams,
  getCustomerOrders,
  createScheduledOrder,
  getCustomerOrderDetails,
  getCustomerOrderStatus,
  getApplicantOrders,
  getApplicantOrderStatus,
  getApplicantOrderDetails,
  declineOrderRequest,
  acceptOrderRequest,
  finishOrderRequest, cancelOrderRequest
} from './controller/order/Order.controller';
import {
  getNotifications,
  markAsReadNotification
} from './controller/notification/Notification.controller';
import {
  addAnnouncementSpecifications,
  createAnnouncement,
  deleteAnnouncement,
  deleteAnnouncementSpecifications,
  getApplicantAnnouncements,
  getCustomerAnnouncementDetails,
  getCustomerAnnouncements,
  starAnnouncement
} from './controller/announcement/announcement.controller';
import { answerQuestionnaire, getQuestionnaire } from './controller/questionnaire/questionnaire.controller';

let server: Server;

export const installHttpMock = ({ environment = 'development' } = {}) => {
  if (server) {
    return server;
  }

  server = createServer({
    environment,
    routes() {
      this.urlPrefix = 'http://api-dev.mol.eurodesign.az:8080';
      this.namespace = '/mol-api/v1';

      this.post('/auth', authRequest);
      this.post('/auth/refresh-token', refreshToken);
      this.post('/auth/validate-token', validateToken);

      // this is for test runner.
      // in test environment we do not have a fin code, we assume that we have
      this.post('/otp/resend', () => ({
        success: true,
        data: {
          phone: '557115061'
        }
      }));

      this.post('/otp/resend/:fin', () => ({
        success: true,
        data: {
          phone: '557115061'
        }
      }));

      this.post('/otp/check-register', otpCheckRegister);
      this.post('/otp/check-login', otpCheckLogin);

      this.put('/users', putUser);
      this.get('/users', getUser);
      this.post('/users', postUser);
      this.put('/users/switch', switchUser);

      this.post('/users/asan/register', registerViaAsan);

      this.post('/user-photo', postUserPhoto);
      this.get('/user-photo', getUserPhoto);

      // information controller
      this.get('/information/cities', informationCities);
      this.get('/information/professions', informationProfessions);
      this.get('/information/experiences', informationExperiences);
      this.get('/information/search-profession', informationSearchProfession);
      this.get('/information/specifications/profession/:professionId', informationSpecificationsProfession);
      this.get('/information/specifications', getInformationSpecifications);

      // customer-order-controller
      this.post('/order/users', getOrderUsersBySearchParams);
      this.post('/order', createOrder);
      this.get('/order/my', getCustomerOrders);
      this.get('/order/my/:id', getCustomerOrderDetails);
      this.get('/order/status-counts', getCustomerOrderStatus);
      this.post('/order/schedule', createScheduledOrder);
      this.put('/order/cancel/:id', cancelOrderRequest);

      // applicant-order-controller
      this.get('/order/user', getApplicantOrders);
      this.get('/order/user/status-counts', getApplicantOrderStatus);
      this.get('/order/user/:id', getApplicantOrderDetails);
      this.put('/order/user/accept/:id', acceptOrderRequest);
      this.put('/order/user/decline/:id', declineOrderRequest);
      this.put('/order/user/finish/:id', finishOrderRequest);
      this.put('/order/user/cancel/:id', cancelOrderRequest);

      // customer-announcement-controller
      this.post('/announcements', createAnnouncement);
      this.get('/announcements', getCustomerAnnouncements);
      this.get('/announcements/:id', getCustomerAnnouncementDetails);
      this.delete('/announcements/:id', deleteAnnouncement);

      // applicant-announcement-controller
      this.get('/user-announcements', getApplicantAnnouncements);
      this.put('/user-announcements/star/:id', starAnnouncement);

      // guest-announcement-controller
      this.get('/user-announcements/public', getApplicantAnnouncements);

      // user-announcement-profession-specification-controller
      this.get('/announcement-profession-specifications', getInformationSpecifications);
      this.post('/announcement-profession-specifications/:id', addAnnouncementSpecifications);
      this.delete('/announcement-profession-specifications/:id', deleteAnnouncementSpecifications);

      // questionnaire
      this.get('/user-questionnaire/:id', getQuestionnaire);
      this.post('user-questionnaire/answer/', answerQuestionnaire);
      // notifications
      this.get('/notifications', getNotifications);
      this.put('/notifications/mark-as-read/:id', markAsReadNotification);

      // important: specify domain if it's external
      this.passthrough('https://maps.googleapis.com/**');
    }
  });

  return server;
};

const otpCheckRegister = (schema: any, request: Request) => {
  const reqBody = JSON.parse(request.requestBody);

  if (reqBody.keyword === '0000') {
    return new Response(400, {}, { error: 'Wrong otp code' });
  }

  return new Response(200, {}, {
    message: null,
    data: {
      token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjM0NTZjIiwiZXhwIjoxNjMyMzk2OTE2LCJpYXQiOjE2MzIzMTA1MTYsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0MifV0sInN0YXR1cyI6IkFDVElWRSJ9.qtbp6WsTbBXA9cTm9VXKXbY_SgXi-ejc1dbA1WPrUwIuCJ40nYs0wZ4Hsv4Zbj0hA0GHwFYiRig6jVRFsBUOqw'
    },
    timestamp: '03.08.2021 10:44:00',
    subErrors: null
  });
};
const otpCheckLogin = (schema, request: Request) => {
  const reqBody = JSON.parse(request.requestBody);

  if (reqBody.keyword === '0000') {
    return new Response(400, {}, { error: 'Wrong otp code' });
  }

  return new Response(200, {}, {
    data: {
      refreshToken: 'd076d429-367c-4b79-b67b-b16658768234',
      token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjM0NTZjIiwiZXhwIjoxNjMyMzk2OTE2LCJpYXQiOjE2MzIzMTA1MTYsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0MifV0sInN0YXR1cyI6IkFDVElWRSJ9.qtbp6WsTbBXA9cTm9VXKXbY_SgXi-ejc1dbA1WPrUwIuCJ40nYs0wZ4Hsv4Zbj0hA0GHwFYiRig6jVRFsBUOqw'
    },
    message: null,
    subErrors: null,
    timestamp: '04.08.2021 10:32:50'
  });
};
