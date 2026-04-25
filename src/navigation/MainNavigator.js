import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import MainLayout from '../Layout/MainLayout';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['http://localhost:8081', 'mylegalabode://'],
  config: {
    screens: {
      Login: 'login',
      AppDrawer: {
        path: '',
        screens: {
          Dashboard: 'dashboard',
          Case: 'case',
          Calendar: 'calendar',
          Message: 'message',
          AdminRoles: 'admin/roles',
          AdminPermissions: 'admin/permissions',
          AdminUsers: 'admin/users',
          Profile: 'profile'
        }
      }
    }
  }
};

export default function MainNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="AppDrawer" component={MainLayout} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
