import React from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationState } from '@react-navigation/native';

// @TODO change name to useNavigationState
export default function useNavigationInitialState(): NavigationStateReturnType {
  const [initialState, setInitialState] = React.useState();
  const [isReady, setIsReady] = React.useState(!__DEV__);

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        if (Platform.OS !== 'web') {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  return [isReady, initialState];
}

export const resetNavigationState = () => AsyncStorage.removeItem(PERSISTENCE_KEY);

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

type isReadyType = boolean;
type NavigationStateType = NavigationState | undefined;
type setNavigationStateType = (state: NavigationStateType) => void

type NavigationStateReturnType = [
  isReadyType,
  NavigationStateType,
]

export const setNavigationState: setNavigationStateType = (
  state
) => AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
