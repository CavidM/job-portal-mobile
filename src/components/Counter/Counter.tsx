import React from 'react';
import {
  Button, IButtonProps, Text
} from 'native-base';
import PlusCountIcon from '../Icons/PlusCountIcon';
import MinusCountIcon from '../Icons/MinusCountIcon';

interface CounterProps extends IButtonProps{
  onPressDecrement: ()=> void,
  onPressIncrement: ()=> void,
  count: number
}
export const Counter: React.FC<CounterProps> = (props) => {
  const {
    onPressDecrement,
    onPressIncrement,
    count,
    ...rest
  } = props;

  return (

    <Button.Group
      variant="outline"
      isAttached
    >
      <Button
        colorScheme="gray"
        borderRadius={100 / 2}
        width={45}
        height={45}
        onPress={onPressDecrement}
        disabled={count === 1}
        {...rest}

      >
        <MinusCountIcon />
      </Button>
      <Text
        width={9}
        textAlign="center"
        color="black"
        fontFamily="InterMedium"
        fontSize={18}
        marginY={2.5}
        mx={2}
      >
        {count}
      </Text>
      <Button
        colorScheme="gray"
        borderRadius={100 / 2}
        width={45}
        height={45}
        onPress={onPressIncrement}
        {...rest}

      >
        <PlusCountIcon />
      </Button>
    </Button.Group>
  );
};
