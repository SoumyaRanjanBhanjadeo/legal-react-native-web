import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';

import { AuthProvider } from './src/context/AuthContext';
import { SidebarProvider } from './src/context/SidebarContext';
import MainNavigator from './src/navigation/MainNavigator';
import { Toaster } from 'react-hot-toast';
import { Platform } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <SidebarProvider>
          <MainNavigator />
          <StatusBar style="light" />
          {Platform.OS === 'web' && <Toaster position="top-right" />}
        </SidebarProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
