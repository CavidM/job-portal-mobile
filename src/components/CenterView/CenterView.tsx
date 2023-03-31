import React, { CSSProperties } from 'react';
import { StyleSheet, View } from 'react-native';
import useCachedResources from '../../hooks/useCachedResources';
import { AllProviders } from '../../tools/Providers';

interface CenterViewProps {
  children: React.ReactNode,
  style?: CSSProperties
}

const CenterView = ({ children, style = {} }: CenterViewProps) => {
  const isLoadingComplete = useCachedResources();
  if (isLoadingComplete) {
    return (
      <AllProviders>
        <View style={[styles.center, style]}>{children}</View>
      </AllProviders>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CenterView;
