import React, { useEffect, useState } from 'react';
import { Text, useToast, View } from 'native-base';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { QuestionnaireService } from '../../services/questionnaire/Questionnaire.service';
import { questionnaireSelectors } from '../../store/slices/questionnaire.slice';
import { Questionnaire } from './Questionnaire.page';
import Loader from '../../components/Loader/Loader';
import { AnswerQuestionnaireRequestProps, QuestionsModel } from '../../services/questionnaire/QuestionnaireService.types';
import normalize from '../common/styles/normalize';
import { FakeModal } from '../../components/FakeModal/FakeModal';
import { COLORS } from '../../core/theme/Constants';
import Button from '../../components/button/Button';

const questionnaire = QuestionnaireService();

export const QuestionnaireContainer = ({ callback } : any) => {
  const toast = useToast();
  const navigation = useNavigation();
  const QuestionnaireStore = useSelector(questionnaireSelectors.getQuestionnaire);
  const { data, isLoading } = questionnaire.useGetQuestionnaire(
    QuestionnaireStore.userQuestionnaireId
  );
  const { mutate } = questionnaire.useAnswerQuestionnaire();
  const [question, setQuestion] = useState<QuestionsModel[] | undefined>([]);
  useEffect(() => {
    setQuestion(data?.data?.data?.questionnaireDTO.questions);
  }, [data]);
  const [index, setIndex] = useState(0);
  const [isQuestionnaireOver, setQuestionnaireOver] = useState(false);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<AnswerQuestionnaireRequestProps>(
    {
      userQuestionnaireId: undefined,
      answers: []
    }
  );

  const setAnswers = (
    answer: number | string, questionId: number, type: string, nextQuestionOrderId: number
  ) => {
    setQuestionnaireAnswers({
      userQuestionnaireId: data?.data?.data?.userQuestionnaireId,
      answers:
          [...questionnaireAnswers.answers,
            {
              questionId,
              type,
              answer
            }]
    });
    if (index < question?.length - 1 && nextQuestionOrderId) {
      setIndex(index + 1);
    } else {
      setQuestionnaireOver(!isQuestionnaireOver);
    }
  };
  useEffect(() => {
    if (isQuestionnaireOver) {
      mutate(questionnaireAnswers, {
        onSuccess: () => {
          toast.show({
            placement: 'bottom',
            title: 'Təşəkkür edirik!',
            status: 'success',
            width: normalize(324)
          });

          callback();
        },
        onError: () => {
          toast.show({
            placement: 'bottom',
            title: 'Xəta baş verdi',
            status: 'error',
            width: normalize(324)
          });
        }
      });
    }
  }, [isQuestionnaireOver]);

  const questionnaireStatus = data?.data?.data?.userQuestionnaireStatus;

  return (
    <>
      { questionnaireStatus === 'COMPLETED'
        ? (
          <FakeModal
            modalWrapperStyle={{ backgroundColor: COLORS.cardBorderColor }}
          >
            <Text marginBottom={3} textAlign="center">
              Hörmətli istifadəçi, siz artıq bu sorğunu tamamlamısınız!
            </Text>
            <Button
              variant="primary"
              width="60%"
              title="Geri qayıt"
              size="sm"
              onPress={() => navigation.goBack()}

            />
          </FakeModal>
        )
        : (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            {isLoading ? <Loader />
              : (
                question
                      && (
                      <Questionnaire
                        next={setAnswers}
                        options={question[index]?.options}
                        question={question[index]?.content}
                        type={question[index]?.type}
                        questionId={question[index]?.questionId}
                        currentQuestion={index + 1}
                        questionCount={question.length}
                      />
                      )
              )}
          </View>
        )}

    </>

  );
};
