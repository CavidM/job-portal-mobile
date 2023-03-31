export const QuestionnaireData = {
  message: null,
  data: {
    userQuestionnaireId: 7,
    userQuestionnaireStatus: 'NOT_COMPLETED',
    questionnaireDTO: {
      questionnaireId: 7,
      title: 'test=title',
      description: 'test-description',
      questions: [
        {
          questionId: 25,
          type: 'RATE',
          orderId: 1,
          content: 'TEST_FIRST_NAME TEST_LAST_NAME davranışında nəzakətliydi?',
          title: 'Sual 1',
          options: []
        },
        {
          questionId: 26,
          type: 'MULTIPLE_CHOICE',
          orderId: 2,
          content: 'TEST_FIRST_NAME TEST_LAST_NAME razılaşdığınız vaxtda qeyd edilən ünvana çatdımı?',
          title: 'Sual 2',
          options: [
            {
              optionId: 51,
              content: 'Bəli',
              nextQuestionOrderId: 3
            },
            {
              optionId: 52,
              content: '15 dəqiqə gecikmə',
              nextQuestionOrderId: 3
            },
            {
              optionId: 53,
              content: '30 dəqiqə gecikmə',
              nextQuestionOrderId: 3
            },
            {
              optionId: 54,
              content: '1 saat gecikmə',
              nextQuestionOrderId: 3
            },
            {
              optionId: 55,
              content: '1 saatdan çox gecikmə',
              nextQuestionOrderId: 3
            }
          ]
        },
        {
          questionId: 27,
          type: 'MULTIPLE_CHOICE',
          orderId: 3,
          content: 'Lazımı alətlər və ya digər tələb edilən ləvazimatlar var idi?',
          title: 'Sual 3',
          options: [
            {
              optionId: 56,
              content: 'Bəli',
              nextQuestionOrderId: 4
            },
            {
              optionId: 57,
              content: 'Qismən',
              nextQuestionOrderId: 4
            },
            {
              optionId: 58,
              content: 'Xeyr',
              nextQuestionOrderId: 4
            }
          ]
        },
        {
          questionId: 28,
          type: 'MULTIPLE_CHOICE',
          orderId: 4,
          content: 'İşiniz həll edildimi?',
          title: 'Sual 4',
          options: [
            {
              optionId: 59,
              content: 'Bəli',
              nextQuestionOrderId: 5
            },
            {
              optionId: 60,
              content: 'Qismən',
              nextQuestionOrderId: 5
            },
            {
              optionId: 61,
              content: 'Xeyr',
              nextQuestionOrderId: 0
            }
          ]
        },
        {
          questionId: 29,
          type: 'RATE',
          orderId: 5,
          content: 'İşin keyfiyyəti',
          title: 'Sual 5',
          options: []
        }
      ],
      author: 'testFinC1',
      id: 7,
      createdAt: '2021-10-20 15:57',
      scheduledAt: '2021-10-20 15:57',
      questionnaireStatus: 'FINISHED',
      searchParams: {
        userId: 6,
        authorityName: 'B',
        professionIds: null,
        specificationIds: null,
        cityIds: null,
        minSalary: null,
        genderType: null,
        minAge: null,
        maxAge: null,
        experience: null,
        pageSize: 10,
        pageIndex: 0
      }
    }
  },
  timestamp: '20.10.2021 15:57:57',
  subErrors: null
};
