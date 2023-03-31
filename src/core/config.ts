import * as Updates from 'expo-updates';

export const CLIENT_TYPE = 'MOBILE';

interface Environment {
  envName: string
  apiUrl: string
  notificationUrl: string
}

export function getEnvironment(): Environment {
  if (Updates.releaseChannel.startsWith('prod')) {
    // matches prod-v1, prod-v2, prod-v3
    return {
      envName: 'prod',
      apiUrl: 'http://api.az:8080/mol-api/v1',
      notificationUrl: 'http://notification.az:8080/notification-api/v1'
    }; // prod env settings
  } if (Updates.releaseChannel.startsWith('uat')) {
    // matches uat-v1, uat-v2
    return {
      envName: 'uat',
      apiUrl: 'http://api-uat.az:8080/mol-api/v1',
      notificationUrl: 'http://notification-uat.az:8080/notification-api/v1'
    }; // stage env settings
  }
  // assume any other release channel is development
  return {
    envName: 'dev',
    apiUrl: 'http://api-dev.az:8080/mol-api/v1',
    notificationUrl: 'http://notification-dev.az:8080/notification-api/v1'
  }; // dev env settings
  // return { envName: 'DEV', apiUrl: 'http://mol-api.uat.az:8080/mol-api/v1' }; // dev env settings
}
