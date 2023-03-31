import React, { useState } from 'react';
import { Counter } from './Counter';

export const CounterContainer = () => {
  const [count, setCount] = useState(1);
  return (
    <Counter
      onPressDecrement={() => setCount(count - 1)}
      onPressIncrement={() => setCount(count + 1)}
      count={count}
    />
  );
};
