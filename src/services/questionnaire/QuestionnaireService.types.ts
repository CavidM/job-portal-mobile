export interface QuestionnaireResponseProps {
    data:{
    questionnaireDTO: {
        author: string,
        createdAt: string,
        description: string,
        id: number,
        questionnaireId: number,
        questionnaireStatus: string,
        questions: QuestionsModel[],
        scheduledAt: string,
        searchParams: {
            authorityName: string,
            cityIds: [
                number
            ],
            experience: string,
            genderType: string,
            maxAge: number,
            minAge: number,
            minSalary: number,
            pageIndex: number,
            pageSize: number,
            professionIds: [
                number
            ],
            specificationIds: [
                number
            ],
            userId: number
        },
        title: string
    },
    userQuestionnaireId: number,
    userQuestionnaireStatus: string
}}
export interface AnswerQuestionnaireRequestProps{
    userQuestionnaireId: number | undefined,
    answers:AnswersModel[]
}
export interface QuestionsModel {
    content: string,
    options: OptionsModel[],
    orderId: number,
    questionId: number,
    title: string,
    type: string
}
export interface AnswersModel{
    questionId: number,
    type: string,
    answer: number | string
}
export interface OptionsModel {
    content: string,
    nextQuestionOrderId: number,
    optionId: number
}
