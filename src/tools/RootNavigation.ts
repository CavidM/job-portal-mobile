import * as React from 'react';

export const isReadyNavigationRef = React.createRef();

export const navigationRef = React.createRef();

let timeout: NodeJS.Timeout | null = null;

export function navigate(name: string, params?: object) {
  if (timeout) {
    clearTimeout(timeout);
  }

  if (isReadyNavigationRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    console.log('navigate func trigger');
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later

    timeout = setTimeout(() => {
      console.log('navigate func triggered after 100 mss');
      navigate(name, params);
    }, 100);
  }
}
