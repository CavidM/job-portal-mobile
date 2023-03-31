import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Animated from 'react-native-reanimated';
import { backgroundColor, border, styles } from 'styled-system';

export function ProfilePageTab({
  state, descriptors, navigation, position
}) {
  return (
    <View style={{ flexDirection: 'row', paddingTop: 20 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          });
        };
        // modify inputRange for custom behavior
        // const inputRange = state.routes.map((_, i) => i);
        // const opacity = Animated?.interpolate(position, {
        //   inputRange,
        //   outputRange: inputRange.map((i) => (i === index ? 1 : 0))
        // });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              // shadowColor: '#000',
              // shadowOffset: {
              //   width: 0,
              //   height: 2
              // },
              // shadowOpacity: 0.25,
              // shadowRadius: 1.84,

              // elevation: 5
              marginBottom: 8
              // alignItems: 'center'
            }}
          >
            <Animated.Text style={{
              height: 33,
              backgroundColor: isFocused ? 'orange' : '#fff',
              margin: 2,
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              color: isFocused ? '#fff' : '#000',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: '600',
              paddingTop: 5
            }}
            >
              {label}

            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// const Tab = createMaterialTopTabNavigator();

// export function ProfilePageTab() {
//   return (
//     // <NavigationContainer>
//     <Tab.Navigator
//       tabBar={(props) => <MyTabBar {...props} />}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//     // </NavigationContainer>
//   );
// }
