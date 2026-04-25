import React, { useState } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import toast from 'react-hot-toast';

export default function Header({ navigation }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { logout } = useAuth();
  const { toggleSidebar } = useSidebar();
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 1024;

  const handleMenuPress = () => {
    if (isLargeScreen) {
      toggleSidebar();
    } else {
      navigation.toggleDrawer();
    }
  };

  const confirmLogout = () => {
    setDropdownVisible(false);
    toast((t) => (
      <View className="bg-white rounded-xl p-4 shadow-2xl items-center min-w-[250px]">
        <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center mb-3">
          <Ionicons name="warning" size={24} color="#ef4444" />
        </View>
        <Text className="text-zinc-800 font-bold text-lg mb-1">Log Out</Text>
        <Text className="text-zinc-500 text-center text-sm mb-5">Are you sure you want to log out?</Text>
        
        <View className="flex-row w-full justify-between">
          <TouchableOpacity 
            className="flex-1 bg-zinc-100 py-2.5 rounded-lg mr-2 items-center"
            onPress={() => toast.dismiss(t.id)}
          >
            <Text className="text-zinc-600 font-semibold">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 bg-red-500 py-2.5 rounded-lg ml-2 items-center"
            onPress={() => {
              toast.dismiss(t.id);
              logout();
            }}
          >
            <Text className="text-white font-semibold">Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    ), { duration: Infinity, position: 'top-center', style: { padding: 0, backgroundColor: 'transparent', boxShadow: 'none' } });
  };

  return (
    <View className="flex-row items-center justify-between px-6 py-4 bg-[#090b14] border-b border-slate-800 z-50">
      <TouchableOpacity 
        onPress={handleMenuPress}
        className="w-10 h-10 bg-slate-800 rounded-full items-center justify-center border border-slate-700"
      >
        <Ionicons name="menu" size={20} color="#cbd5e1" />
      </TouchableOpacity>

      <View className="flex-row items-center relative">
        <TouchableOpacity className="w-10 h-10 bg-slate-800 rounded-full items-center justify-center border border-slate-700 mr-4 relative">
          <Ionicons name="notifications-outline" size={20} color="#cbd5e1" />
          <View className="absolute top-2 right-2.5 w-2 h-2 bg-emerald-500 rounded-full border border-slate-800" />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center bg-slate-800/50 py-1.5 px-2 rounded-full border border-slate-700"
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <View className="w-9 h-9 bg-white rounded-full items-center justify-center mr-3 relative">
            <Ionicons name="person" size={20} color="#090b14" />
            <View className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
          </View>
          <View className="mr-3">
            <Text className="text-white font-bold text-sm leading-tight">Priya</Text>
            <Text className="text-slate-400 text-[10px] leading-tight">Associate</Text>
          </View>
          <Ionicons name="chevron-down" size={16} color="#94a3b8" className="mr-2" />
        </TouchableOpacity>

        {dropdownVisible && (
          <View className="absolute top-14 right-0 w-48 bg-[#1e293b] rounded-xl shadow-xl border border-slate-700 z-50 overflow-hidden">
            <TouchableOpacity 
              className="flex-row items-center px-4 py-3 border-b border-slate-700/50"
              onPress={() => {
                setDropdownVisible(false);
                navigation.navigate('Profile');
              }}
            >
              <Ionicons name="person-outline" size={18} color="#cbd5e1" />
              <Text className="text-white ml-3 font-medium">Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="flex-row items-center px-4 py-3 bg-red-500/10"
              onPress={confirmLogout}
            >
              <Ionicons name="log-out-outline" size={18} color="#ef4444" />
              <Text className="text-red-500 ml-3 font-medium">Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
