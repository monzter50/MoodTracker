import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './Home.screen';
import { HistoryScreen } from './History.screen';
import { AnalyticsScreen } from './Analytics.screen';
import { HomeIcon, HistoryIcon, AnalyticsIcon } from '../components';
import { theme } from '../theme';
const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        headerTitleStyle: { fontFamily: theme.fontFamilyBold },
        tabBarActiveTintColor: theme.primaryColor,
        tabBarInactiveTintColor: theme.colorGrey,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <HomeIcon color={color} size={size} />;
          }
          if (route.name === 'History') {
            return <HistoryIcon color={color} size={size} />;
          }
          if (route.name === 'Analytics') {
            return <AnalyticsIcon color={color} size={size} />;
          }
          return null;
        },
      })}>
      <BottomTabs.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Today's Mood" }}
      />
      <BottomTabs.Screen
        name="History"
        component={HistoryScreen}
        options={{ title: 'Past Moods' }}
      />
      <BottomTabs.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{ title: 'Fancy Charts' }}
      />
    </BottomTabs.Navigator>
  );
};
