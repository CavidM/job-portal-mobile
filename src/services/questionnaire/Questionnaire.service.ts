import { useMutation, useQuery } from 'react-query';
import { HTTP } from '../../core/http/HttpClient';
import { AnswerQuestionnaireRequestProps, QuestionnaireResponseProps } from './QuestionnaireService.types';

export const getUncompletedQuestionnaires = () => HTTP.client()
  .get<QuestionnaireResponseProps[]>('user-questionnaire/uncompleted-questionnaires');

export const QuestionnaireService = () => {
  const useGetQuestionnaire = (userQuestionnaireId: number | null) => useQuery(
    ['/user-questionnaire', userQuestionnaireId], getQuestionnaire
  );
  const getQuestionnaire = ({ queryKey }: any) => HTTP.client().get<QuestionnaireResponseProps>(`user-questionnaire/${queryKey[1]}`);
  const useAnswerQuestionnaire = () => useMutation(answerQuestionnaire);
  const answerQuestionnaire = (payload: AnswerQuestionnaireRequestProps) => HTTP.client().post('user-questionnaire/answer/', payload);

  return {
    useGetQuestionnaire,
    useAnswerQuestionnaire
  };
};
