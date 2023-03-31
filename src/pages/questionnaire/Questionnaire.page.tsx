import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView, Text, TextArea, View
} from 'native-base';
import { AirbnbRating } from 'react-native-ratings';
import { CheckElementWhite, CheckListWrapper } from '../../components/Checkbox/CheckboxElements';
import { CheckboxSingleList } from '../../components/Checkbox/CheckboxSingleList';
import Button from '../../components/button/Button';
import { Labels } from '../../core/Langs';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import normalize from '../common/styles/normalize';
import { OptionsModel } from '../../services/questionnaire/QuestionnaireService.types';
import useFontStyles from '../../components/common/font.style';

interface QuestionsProps{
    question: string,
    type: string,
    options: OptionsModel[],
    next: (answer:number | string, questionId: number,
           type: string, nextQuestionOrderId: number)=> void,
    questionId: number,
    currentQuestion: number,
    questionCount: number
}

export const Questionnaire = (props: QuestionsProps) => {
  const { theme } = useTheme() as ThemeContextType;
  const { color } = theme.palette;
  const fontStyle = useFontStyles();
  const {
    question, type, options, next, questionId, currentQuestion, questionCount
  } = props;
  const [answer, setAnswer] = useState<number | string>(0);
  const [nextQuestionOrderId, setNextQuestionOrderId] = useState(1);
  const textRef = useRef();

  useEffect(() => {
    setAnswer(0);
    textRef?.current?.clear();
  }, [question]);

  let ComponentBasedOnQuestionnaireType;

  switch (type) {
    case 'RATE': {
      ComponentBasedOnQuestionnaireType = (
        <AirbnbRating
          onFinishRating={(rating:number) => setAnswer(rating)}
          showRating={false}
          defaultRating={0}
        />
      );
      break;
    }
    case 'MULTIPLE_CHOICE': {
      ComponentBasedOnQuestionnaireType = (
        <CheckListWrapper>
          <CheckboxSingleList
            style={{ flexDirection: 'column' }}
            onChecked={(option) => setAnswer(option)}
            data={options}
            render={(data:any, onClickItem: (e:any)=>void, selectedItem: any) => (
              <CheckElementWhite
                key={data.optionId}
                label={data.content}
                onPress={() => {
                  onClickItem(data.optionId);
                  setNextQuestionOrderId(data?.nextQuestionOrderId);
                }}
                selected={selectedItem === data.optionId}
                style={{
                  marginVertical: 4,
                  width: normalize(270),
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: selectedItem === data.optionId
                    ? color.primary : color.cardBorderColor,
                  backgroundColor: color.white
                }}
                labelStyle={{ color: color.dark, fontSize: 14 }}
                selectedItemLabelColor={{ color: color.dark }}
              />
            )}
          />
        </CheckListWrapper>
      );
      break;
    }
    default:
      ComponentBasedOnQuestionnaireType = (
        <TextArea
          borderColor={color.cardBorderColor}
          _focus={{ borderColor: color.cardBorderColor }}
          backgroundColor={color.white}
          onChangeText={(e) => setAnswer(e)}
          ref={textRef}
          color={theme.palette.color.dark}
          fontFamily="InterRegular"
          textAlignVertical="top"
        />
      );
      break;
  }

  return (
    <View>
      <ScrollView contentContainerStyle={{ justifyContent: 'center', flex: 1 }} scrollEnabled={false}>
        <Text mx={2} color={color.lightDark} fontSize={16} style={fontStyle.fontFamilyInterMedium} mb={5} textAlign="center">{question}</Text>
        { ComponentBasedOnQuestionnaireType }
      </ScrollView>

      <View bottom={0} paddingY={5}>
        <Button
          disabled={!answer}
          variant="primary"
          size="sm"
          title={currentQuestion === questionCount || !nextQuestionOrderId ? Labels.submit : `${Labels.next} ${currentQuestion}/${questionCount}`}
          style={{ backgroundColor: !answer ? color.cardBorderColor : color.primary }}
          onPress={() => next(answer, questionId, type, nextQuestionOrderId)}
        />
      </View>

    </View>

  );
};
