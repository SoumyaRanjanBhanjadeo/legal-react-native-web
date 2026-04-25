import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 1024;

  const MetricCard = ({ title, value, subtitle, dotColor, badgeText = "Live", isTall = false }) => (
    <View className={`bg-[#0a0f1e] rounded-2xl p-5 border border-slate-800 shadow-sm ${isTall ? 'flex-1 ml-4' : 'w-[48%] mb-4'} relative`}>
      <Text className="text-slate-400 text-xs font-bold tracking-wider mb-2 uppercase">{title}</Text>
      <View className="flex-row items-center mb-1">
        <Text className="text-white text-3xl font-bold mr-3">{value}</Text>
        <View className="bg-blue-900/40 border border-blue-700/50 px-2 py-0.5 rounded flex-row items-center">
          <Ionicons name="arrow-up" size={10} color="#60a5fa" />
          <Text className="text-blue-400 text-[10px] font-bold ml-1 uppercase">{badgeText}</Text>
        </View>
      </View>
      <Text className="text-slate-500 text-xs">{subtitle}</Text>
      <View className={`absolute top-5 right-5 w-3 h-3 rounded-full ${dotColor}`} />
    </View>
  );

  const ActionCard = ({ icon, title, subtitle }) => (
    <TouchableOpacity className="bg-[#0a0f1e] rounded-2xl p-4 border border-slate-800 shadow-sm mb-3 flex-row items-center">
      <View className="w-10 h-10 bg-slate-800 rounded-full items-center justify-center mr-4 border border-slate-700">
        <Ionicons name={icon} size={18} color="#fbbf24" />
      </View>
      <View className="flex-1">
        <Text className="text-white font-bold text-sm mb-0.5">{title}</Text>
        <Text className="text-slate-500 text-[10px]">{subtitle}</Text>
      </View>
      <Text className="text-slate-400 text-xs font-medium">Open</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1 p-4 lg:p-8" contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Outer Dashboard Container */}
      <View className="bg-[#0b1120] rounded-3xl border border-slate-800 p-6 lg:p-8">
        
        {/* Inner Header */}
        <View className="flex-col lg:flex-row lg:justify-between lg:items-end border-b border-slate-800/80 pb-6 mb-8">
          <View>
            <View className="flex-row items-center mb-2">
              <Ionicons name="pulse" size={24} color="#60a5fa" />
              <Text className="text-white text-3xl font-bold ml-2">Dashboard</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-slate-400 text-sm">Welcome back, Priya.</Text>
              <Text className="text-slate-600 mx-2">•</Text>
              <Ionicons name="time-outline" size={14} color="#94a3b8" />
              <Text className="text-slate-400 text-sm ml-1">Monday, 9 March 2026</Text>
            </View>
          </View>
          
          <View className="flex-row mt-4 lg:mt-0">
            <View className="flex-row items-center bg-slate-900/50 border border-slate-800 px-3 py-1.5 rounded-full mr-3">
              <View className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
              <Text className="text-slate-400 text-xs font-medium">Live mock feed</Text>
            </View>
            <View className="bg-slate-900/50 border border-slate-800 px-3 py-1.5 rounded-full">
              <Text className="text-slate-400 text-xs font-medium">Updated: 20/04/2026</Text>
            </View>
          </View>
        </View>

        {/* Content Columns */}
        <View className="flex-col lg:flex-row">
          
          {/* Left Section: Today at a glance */}
          <View className={`flex-1 ${isLargeScreen ? 'mr-8' : 'mb-8'}`}>
            <View className="flex-row justify-between items-start mb-6">
              <View>
                <View className="flex-row items-center mb-1">
                  <Ionicons name="stats-chart" size={18} color="#34d399" />
                  <Text className="text-white text-lg font-bold ml-2">Today at a glance</Text>
                </View>
                <Text className="text-slate-400 text-xs">Key signals to prioritize work and reduce risk.</Text>
              </View>
              <Text className="text-slate-500 text-xs font-medium"># 5 metrics</Text>
            </View>

            <View className="flex-row flex-wrap justify-between">
              <View className="w-full sm:w-[65%] flex-row flex-wrap justify-between">
                <MetricCard 
                  title="Total Cases" 
                  value="9" 
                  subtitle="All matters" 
                  dotColor="bg-blue-500" 
                />
                <MetricCard 
                  title="Active Cases" 
                  value="9" 
                  subtitle="3 new this month" 
                  dotColor="bg-blue-500" 
                />
                <MetricCard 
                  title="Hearing This Week" 
                  value="2" 
                  subtitle="1 clash detected" 
                  dotColor="bg-yellow-500" 
                />
                <MetricCard 
                  title="Pending Documents" 
                  value="2" 
                  subtitle="4 awaiting approval" 
                  dotColor="bg-emerald-500" 
                />
              </View>
              <View className="w-full sm:w-[35%] flex">
                <MetricCard 
                  title="Calendar Events" 
                  value="9" 
                  subtitle="Across your schedule" 
                  dotColor="bg-cyan-400"
                  isTall={true} 
                />
              </View>
            </View>
          </View>

          {/* Right Section: Quick Actions */}
          <View className={`w-full ${isLargeScreen ? 'w-80' : ''}`}>
            <View className="flex-row justify-between items-start mb-6">
              <View className="flex-1 pr-4">
                <Text className="text-white text-lg font-bold mb-1">Quick actions</Text>
                <Text className="text-slate-400 text-xs leading-tight">Start common tasks without leaving the dashboard.</Text>
              </View>
              <View className="w-6 h-6 bg-slate-800 rounded-full items-center justify-center">
                <Text className="text-slate-300 text-xs font-bold">4</Text>
              </View>
            </View>

            <View>
              <ActionCard 
                icon="add" 
                title="New Case" 
                subtitle="One-click workflow" 
              />
              <ActionCard 
                icon="person-add" 
                title="New Client Profile" 
                subtitle="One-click workflow" 
              />
              <ActionCard 
                icon="paper-plane" 
                title="Invite Client" 
                subtitle="One-click workflow" 
              />
              <ActionCard 
                icon="chatbox-ellipses" 
                title="Compose Message" 
                subtitle="One-click workflow" 
              />
            </View>
          </View>

        </View>
      </View>
    </ScrollView>
  );
}
