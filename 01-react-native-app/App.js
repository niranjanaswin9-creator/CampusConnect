import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { AppProvider, useApp } from './src/context/AppContext';
import { colors } from './src/theme';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import TimetableScreen from './src/screens/TimetableScreen';
import AssignmentsScreen from './src/screens/AssignmentsScreen';
import LostFoundScreen from './src/screens/LostFoundScreen';
import ItemDetailScreen from './src/screens/ItemDetailScreen';
import ReportItemScreen from './src/screens/ReportItemScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Which icon each bottom tab shows.
const TAB_ICONS = {
  Dashboard: 'home',
  Timetable: 'calendar',
  Assignments: 'checkbox',
  LostFound: 'search',
  Profile: 'person',
};

const headerOptions = {
  headerStyle: { backgroundColor: colors.primary },
  headerTintColor: '#fff',
};

// The five main screens, reached from the bottom tab bar.
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...headerOptions,
        tabBarActiveTintColor: colors.accent,
        tabBarIcon: ({ color, size }) => <Ionicons name={TAB_ICONS[route.name]} size={size} color={color} />,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Timetable" component={TimetableScreen} />
      <Tab.Screen name="Assignments" component={AssignmentsScreen} />
      <Tab.Screen name="LostFound" component={LostFoundScreen} options={{ title: 'Lost & Found' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Decides which screens exist: login screen if nobody is logged in, otherwise the real app.
function RootNavigator() {
  const { user } = useApp();
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      {user ? (
        <>
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="ItemDetail" component={ItemDetailScreen} options={{ title: 'Item Details' }} />
          <Stack.Screen name="ReportItem" component={ReportItemScreen} options={{ title: 'Report an Item' }} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <RootNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}
