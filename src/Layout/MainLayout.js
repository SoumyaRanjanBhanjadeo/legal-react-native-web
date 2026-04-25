import React, { Suspense } from 'react';
import { useWindowDimensions, View, ActivityIndicator } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useSidebar } from '../context/SidebarContext';

const DashboardScreen = React.lazy(() => import('../screens/DashboardScreen'));
const ProfileScreen = React.lazy(() => import('../screens/ProfileScreen'));
const CaseScreen = React.lazy(() => import('../screens/CaseScreen'));
const CalendarScreen = React.lazy(() => import('../screens/CalendarScreen'));
const MessageScreen = React.lazy(() => import('../screens/MessageScreen'));
const AdminRolesScreen = React.lazy(() => import('../screens/AdminRolesScreen'));
const AdminPermissionsScreen = React.lazy(() => import('../screens/AdminPermissionsScreen'));
const AdminUsersScreen = React.lazy(() => import('../screens/AdminUsersScreen'));

const Drawer = createDrawerNavigator();

const LazyScreen = ({ Component }) => (
  <Suspense fallback={
    <View className="flex-1 bg-[#090b14] items-center justify-center">
      <ActivityIndicator size="large" color="#fbbf24" />
    </View>
  }>
    <Component />
  </Suspense>
);

export default function MainLayout() {
  const { width } = useWindowDimensions();
  const { isCollapsed } = useSidebar();
  const isLargeScreen = width >= 1024;

  return (
    <Drawer.Navigator
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={({ navigation }) => ({
        header: () => <Header navigation={navigation} />,
        drawerType: isLargeScreen ? 'permanent' : 'front',
        drawerStyle: { width: isLargeScreen ? (isCollapsed ? 80 : '20%') : 260, borderRightColor: '#27272a' },
        sceneContainerStyle: { backgroundColor: '#090b14' },
      })}
    >
      <Drawer.Screen name="Dashboard">
        {() => <LazyScreen Component={DashboardScreen} />}
      </Drawer.Screen>
      <Drawer.Screen name="Case">
        {() => <LazyScreen Component={CaseScreen} />}
      </Drawer.Screen>
      <Drawer.Screen name="Calendar">
        {() => <LazyScreen Component={CalendarScreen} />}
      </Drawer.Screen>
      <Drawer.Screen name="Message">
        {() => <LazyScreen Component={MessageScreen} />}
      </Drawer.Screen>
      <Drawer.Screen name="AdminRoles">
        {() => <LazyScreen Component={AdminRolesScreen} />}
      </Drawer.Screen>
      <Drawer.Screen name="AdminPermissions">
        {() => <LazyScreen Component={AdminPermissionsScreen} />}
      </Drawer.Screen>
      <Drawer.Screen name="AdminUsers">
        {() => <LazyScreen Component={AdminUsersScreen} />}
      </Drawer.Screen>
      <Drawer.Screen name="Profile">
        {() => <LazyScreen Component={ProfileScreen} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
