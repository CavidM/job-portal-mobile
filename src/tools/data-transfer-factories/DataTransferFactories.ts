interface SelectPickerProp {
  id: number,
  name: string
}

interface ISelectPickerListProp {
  key: number,
  value: string
}

export const selectPickerDataFactory = (items: SelectPickerProp[] = []) => items.map((item) => ({
  label: item?.name,
  value: item?.id,
  key: item?.id
}));

export const selectPickerListDataFactory = (items: ISelectPickerListProp[] = []) => items.map((item: ISelectPickerListProp) => ({
  label: item?.value,
  value: item?.key,
  key: item?.key
}));
