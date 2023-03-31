import React from 'react';
import { ProfessionAddContainer } from '../personal-profile/profession-add/ProfessionAdd.container';
import { useSwitchUserType } from '../../core/switch-user-type/useSwitchUserType';

export const AddProfessionWithSwitchUserType = () => {
  const { switchUserType } = useSwitchUserType();

  const onProfessionAdded = () => {
    switchUserType();
  };

  return (
    <ProfessionAddContainer onSuccess={onProfessionAdded} />
  );
};
