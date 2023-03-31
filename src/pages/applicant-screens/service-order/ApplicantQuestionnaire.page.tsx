import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from 'react-query';
import { BackHandler } from 'react-native';
import { QuestionnaireContainer } from '../../questionnaire/QuestionnaireContainer';
import { AppScreens } from '../../../routes/Navigator.types';

export default function ApplicantQuestionnairePage() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);
  const onSuccess = () => {
    queryClient.invalidateQueries('/order/user/status-counts');
    queryClient.invalidateQueries('/order/user');
    navigation.navigate(AppScreens.ApplicantBottomNavigator);
  };

  return (
    <QuestionnaireContainer
      callback={onSuccess}
    />
  );
}
