import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from 'react-query';
import { QuestionnaireContainer } from '../../../questionnaire/QuestionnaireContainer';
import { AppScreens } from '../../../../routes/Navigator.types';

export default function CustomerQuestionnairePage() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries('/order/status-counts');
    queryClient.invalidateQueries('/order/my');
    navigation.navigate(AppScreens.CustomerBottomNavigator);
  };

  return (
    <QuestionnaireContainer
      callback={onSuccess}
    />
  );
}
