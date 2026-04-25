import React from 'react';
import { View, Text } from 'react-native';

export default function AdminUsersScreen() {
  return (
    <View className="flex-1 bg-[#090b14] items-center justify-center p-6">
      <Text className="text-white text-3xl font-bold mb-2">User Management</Text>
      <Text className="text-slate-400">Add, edit, or remove staff accounts.</Text>
    </View>
  );
}
