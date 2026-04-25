import React from 'react';
import { View, Text } from 'react-native';

export default function AdminPermissionsScreen() {
  return (
    <View className="flex-1 bg-[#090b14] items-center justify-center p-6">
      <Text className="text-white text-3xl font-bold mb-2">Permissions</Text>
      <Text className="text-slate-400">Manage granular access controls.</Text>
    </View>
  );
}
