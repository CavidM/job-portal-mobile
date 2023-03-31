import any = jasmine.any;

export interface ServiceResponseProps<PayloadProps> {
  message: null | string
  data: PayloadProps
  timestamp: string
  subErrors: unknown
}

export interface ServiceResponseWithPagination<PayloadProps> {
  message: null | string
  data: {
    data: PayloadProps,
    numberOfElements: number,
    pageNumber: number,
    pageSize: number,
    totalElements: number,
    totalPages: number
  }
  timestamp: string
  subErrors: unknown
}
