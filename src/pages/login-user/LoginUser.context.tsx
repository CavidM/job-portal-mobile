import React from 'react';

export const FormContext = React.createContext<any | undefined>(undefined);
const FIN_LABEL = 'FİN kod və ya 7 simvollu istənilən loqin';
const BIRTHDAY_LABEL = 'Təvəllüd';

export const formFields = {
  fin: {
    label: FIN_LABEL,
    errorMessage: `${FIN_LABEL}u daxil edin`
  },
  birthDate: {
    label: BIRTHDAY_LABEL,
    errorMessage: `${BIRTHDAY_LABEL}ü daxil edin`
  }
};
