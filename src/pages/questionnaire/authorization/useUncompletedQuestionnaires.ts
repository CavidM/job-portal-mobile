import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { getUncompletedQuestionnaires } from '../../../services/questionnaire/Questionnaire.service';
import { questionnaireSelectors, saveQuestionnaireToRedux } from '../../../store/slices/questionnaire.slice';
import { AppScreens } from '../../../routes/Navigator.types';

export const useUncompletedQuestionnaires = () => {
  const dispatch = useDispatch();
  const QuestionnaireStore = useSelector(questionnaireSelectors.getQuestionnaire);
  const navigation = useNavigation();
  useEffect(() => {
    if (QuestionnaireStore.userQuestionnaireId === null) {
      navigation.navigate(AppScreens.ApplicantBottomNavigator);
    } else {
      navigation.navigate(AppScreens.ApplicantEvaluateOrder);
    }
  }, [QuestionnaireStore]);
  function refreshUncompletedQuestionnaires() {
    getUncompletedQuestionnaires().then((data) => {
      dispatch(saveQuestionnaireToRedux(data?.data?.data[0]?.userQuestionnaireId));
    });
  }

  return {
    refreshUncompletedQuestionnaires
  };
};
