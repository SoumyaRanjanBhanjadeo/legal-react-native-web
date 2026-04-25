import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { logout } = useAuth();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: '#0f172a' }}>
      <View className="px-6 py-10 border-b border-slate-800 mb-4">
        <View className="w-16 h-16 rounded-full bg-blue-600 items-center justify-center mb-4">
          <Text className="text-white text-2xl font-bold">JD</Text>
        </View>
        <Text className="text-white text-xl font-bold">John Doe</Text>
        <Text className="text-slate-400 text-sm">john.doe@example.com</Text>
      </View>
      
      <View className="flex-1 px-4">
        <DrawerItemList {...props} />
      </View>
      
      <View className="p-6 border-t border-slate-800">
        <TouchableOpacity 
          className="flex-row items-center p-3 rounded-xl bg-red-500/10"
          onPress={logout}
        >
          <Ionicons name="log-out-outline" size={22} color="#ef4444" />
          <Text className="text-red-500 font-semibold ml-3">Log Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#0f172a', shadowColor: 'transparent', elevation: 0 },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        drawerActiveBackgroundColor: '#1e293b',
        drawerActiveTintColor: '#60a5fa',
        drawerInactiveTintColor: '#94a3b8',
        drawerLabelStyle: { fontSize: 16, fontWeight: '600', marginLeft: -10 },
        sceneContainerStyle: { backgroundColor: '#020617' } // Very dark slate for main content background
      }}
    >
      <Drawer.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{
          drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />
        }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          drawerIcon: ({ color }) => <Ionicons name="person-outline" size={22} color={color} />
        }}
      />
    </Drawer.Navigator>
  );
}
