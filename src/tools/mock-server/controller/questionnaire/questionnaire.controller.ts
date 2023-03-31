import { Response } from 'miragejs';
import { QuestionnaireData } from './questionnaire.data';

export const getQuestionnaire = () => new Response(200, {}, QuestionnaireData);
export const answerQuestionnaire = () => new Response(200, {});
