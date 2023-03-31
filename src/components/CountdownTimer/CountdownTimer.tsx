import React, { useEffect, useState } from 'react';

import { View, Text } from 'react-native';
import useFontStyles from '../common/font.style';
import useStyles from './CountdownTimer.style';

export interface CountdownTimerProps {
  duration: number;
  onFinish: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = (props) => {
  const styles = useStyles();
  const fontStyle = useFontStyles();

  const { duration, onFinish } = props;
  const [timeLeft, setTimeLeft] = useState('');
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let timer: number = duration;
    let minutes;
    let seconds;

    const interval = setInterval(() => {
      // @Todo timer type isuue
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      setTimeLeft(`${minutes}:${seconds}`);
      timer -= 1;
      if (timer < 0) {
        clearInterval(interval);
        setFinished(true);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (finished) {
      onFinish();
    }
  }, [finished]);

  const CountdownTimerStyle: [Object] = [styles.CountdownTimerText];
  return (
    <View style={{ justifyContent: 'center' }}>
      <Text style={CountdownTimerStyle}>
        {timeLeft}
      </Text>
    </View>
  );
};

export default CountdownTimer;
