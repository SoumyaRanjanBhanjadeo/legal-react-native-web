import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <ScrollView className="flex-1 p-6" contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="items-center mb-8 mt-4">
        <View className="w-28 h-28 bg-blue-600 rounded-full items-center justify-center border-4 border-slate-800 shadow-xl mb-4">
          <Text className="text-white text-4xl font-bold">JD</Text>
          <View className="absolute bottom-0 right-0 bg-blue-500 w-8 h-8 rounded-full border-2 border-slate-900 items-center justify-center">
            <Ionicons name="camera" size={14} color="white" />
          </View>
        </View>
        <Text className="text-3xl font-extrabold text-white">John Doe</Text>
        <Text className="text-slate-400 text-base mt-1">Senior Attorney</Text>
      </View>

      <View className="bg-slate-800 rounded-3xl p-2 mb-6 border border-slate-700">
        <ProfileSettingItem icon="person-outline" title="Personal Information" />
        <ProfileSettingItem icon="notifications-outline" title="Notifications" />
        <ProfileSettingItem icon="shield-checkmark-outline" title="Security" />
        <ProfileSettingItem icon="color-palette-outline" title="Appearance" hasBorder={false} />
      </View>

      <Text className="text-slate-500 uppercase text-xs font-bold ml-4 mb-2 tracking-wider">About</Text>
      <View className="bg-slate-800 rounded-3xl p-2 border border-slate-700">
        <ProfileSettingItem icon="help-circle-outline" title="Help & Support" />
        <ProfileSettingItem icon="information-circle-outline" title="Terms of Service" hasBorder={false} />
      </View>

    </ScrollView>
  );
}

function ProfileSettingItem({ icon, title, hasBorder = true }) {
  return (
    <TouchableOpacity className={`flex-row items-center p-4 ${hasBorder ? 'border-b border-slate-700/50' : ''}`}>
      <View className="w-10 h-10 bg-slate-700/50 rounded-full items-center justify-center mr-4">
        <Ionicons name={icon} size={20} color="#94a3b8" />
      </View>
      <Text className="flex-1 text-white text-base font-medium">{title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#64748b" />
    </TouchableOpacity>
  );
}
