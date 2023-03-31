import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Theme, { AppMainColorTypes } from './Constants';

type ThemeType = typeof Theme.light
type SetPrimaryColorType = (color: AppMainColorTypes) => void
export type ThemeContextType = {theme: ThemeType; setPrimaryColor: SetPrimaryColorType}

export const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  return React.useContext(ThemeContext);
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: any
}

export const ThemeProvider = ({ children, defaultTheme = Theme.light }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    AsyncStorage.getItem('theme', (error, savedTheme) => {
      if (savedTheme) {
        // @todo uncomment when finish job, refactor in future, do not save whole theme
        // setTheme(JSON.parse(savedTheme));
      }
    });
  }, []);

  const setPrimaryColor = (color: AppMainColorTypes) => {
    const currentTheme = theme;
    const currentPrimary = theme.palette.color.primary;

    currentTheme.palette.color.primary = color;
    currentTheme.palette.color.secondary = currentPrimary;

    const newTheme = {
      ...theme,
      ...currentTheme
    };

    AsyncStorage.setItem('theme', JSON.stringify(newTheme));

    setTheme(newTheme);
  };

  const value = { theme, setPrimaryColor };

  return (
    <ThemeContext.Provider
      value={value}
    >
      {children}
    </ThemeContext.Provider>
  );
};
