// this file contains the user information on the order card

import React from 'react';
import { Text } from 'native-base';
import {
  TouchableOpacity
} from 'react-native';
import useStyles from '../../../../../components/Card/CardList.style';
import { CallIcon } from '../../../../../components/Icons/CallIcon';
import { Labels } from '../../../../../core/Langs';
import { Call } from '../../../../../tools/call/Linking';

interface CallItemProps {
    active: boolean
    phone: string
}

export const CallButton = (props: CallItemProps) => {
  const { active, phone } = props;
  const styles = useStyles(active);
  return (
    <TouchableOpacity disabled={!active} onPress={() => Call(phone)} style={styles.callButton}>
      <CallIcon />
      <Text style={{
        color: 'white', fontSize: 12, fontFamily: 'InterMedium', marginTop: 5
      }}
      >
        { Labels.call }
      </Text>
    </TouchableOpacity>
  );
};
