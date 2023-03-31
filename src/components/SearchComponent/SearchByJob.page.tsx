import React from 'react';
import { SearchableList } from './SearchableList';

export const SearchByJob = () => {
  const data = [
    {
      name: 'teacher',
      id: 1
    },
    {
      name: 'Doctor',
      id: 2
    }
  ];
  const onChangeSearch = (value: any) => { console.log(value); };
  const onClearSearch = () => {};

  return (
    <SearchableList
      onChangeSearch={onChangeSearch}
      onClearSearch={onClearSearch}
      data={data}
    />

  );
};
