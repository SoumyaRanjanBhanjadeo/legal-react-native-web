import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CaseGridView({ data, onSelectCase }) {
  return (
    <View className="flex-1 bg-[#111827] rounded-2xl border border-slate-800 overflow-hidden z-10">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ minWidth: 1000, flex: 1 }}>
        <View className="flex-1">
          {/* Table Header */}
          <View className="flex-row items-center px-6 py-4 border-b border-slate-800 bg-gradient-to-r from-blue-600/30 via-slate-800 to-amber-600/30">
            <View className="w-[28%]"><Text className="text-white text-xs font-bold tracking-wider">CASE</Text></View>
            <View className="w-[18%]"><Text className="text-white text-xs font-bold tracking-wider">CLIENT</Text></View>
            <View className="w-[10%]"><Text className="text-white text-xs font-bold tracking-wider text-center">TYPE</Text></View>
            <View className="w-[12%]"><Text className="text-white text-xs font-bold tracking-wider text-center">STATUS</Text></View>
            <View className="w-[8%]"><Text className="text-white text-xs font-bold tracking-wider text-center">RISK</Text></View>
            <View className="w-[8%]"><Text className="text-white text-xs font-bold tracking-wider text-center">HEARING</Text></View>
            <View className="w-[16%]"><Text className="text-white text-xs font-bold tracking-wider text-center uppercase">Action</Text></View>
          </View>

          {/* Table Rows */}
          <ScrollView className="flex-1">
            {data.map((row, idx) => (
              <View key={row.id} className="flex-row items-center px-6 py-4 border-b border-slate-800/50 hover:bg-slate-800/30">
                <View className="w-[28%] flex-row items-center">
                  <View className={`w-2 h-2 rounded-full mr-3 ${row.dot}`} />
                  <View>
                    <Text className="text-white text-sm mb-1">{row.title}</Text>
                    <Text className="text-slate-500 text-xs">{row.id}</Text>
                  </View>
                </View>

                <View className="w-[18%] flex-row items-center">
                  <View className="w-8 h-8 rounded-full bg-slate-700 items-center justify-center mr-3">
                    <Text className="text-white text-xs">{row.clientInitials}</Text>
                  </View>
                  <Text className="text-slate-300 text-sm font-medium">{row.clientName}</Text>
                </View>

                <View className="w-[10%] items-center">
                  <View className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                    <Text className="text-slate-300 text-xs font-medium">{row.type}</Text>
                  </View>
                </View>

                <View className="w-[12%] items-center">
                  <View className={`px-3 py-1 rounded-full border ${row.statusBg}`}>
                    <Text className={`${row.statusColor} text-xs font-medium text-center`}>{row.status}</Text>
                  </View>
                </View>

                <View className="w-[8%] flex-row items-center justify-center">
                  <View className={`w-2 h-2 rounded-full mr-2 ${row.riskDot}`} />
                  <Text className="text-slate-300 text-sm">{row.risk}</Text>
                </View>

                <View className="w-[8%] items-center">
                  <Text className="text-slate-300 text-sm text-center">{row.nextHearing}</Text>
                </View>

                <View className="w-[16%] flex-row items-center justify-center space-x-3">
                  <TouchableOpacity 
                    className="w-8 h-8 rounded-lg bg-slate-800/80 items-center justify-center border border-slate-700 hover:bg-blue-600/20"
                    onPress={() => onSelectCase(row)}
                  >
                    <Ionicons name="eye-outline" size={16} color="#cbd5e1" />
                  </TouchableOpacity>
                  <TouchableOpacity className="w-8 h-8 rounded-lg bg-slate-800/80 items-center justify-center border border-slate-700 hover:bg-slate-700">
                    <Ionicons name="pencil-outline" size={16} color="#cbd5e1" />
                  </TouchableOpacity>
                  <TouchableOpacity className="w-8 h-8 rounded-lg bg-slate-800/80 items-center justify-center border border-slate-700 hover:bg-slate-700">
                    <Ionicons name="person-add-outline" size={16} color="#cbd5e1" />
                  </TouchableOpacity>
                  <TouchableOpacity className="w-8 h-8 rounded-lg bg-slate-800/80 items-center justify-center border border-slate-700 hover:bg-slate-700">
                    <Ionicons name="document-text-outline" size={16} color="#cbd5e1" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            
            {data.length === 0 && (
              <View className="p-10 items-center justify-center">
                <Ionicons name="search-outline" size={48} color="#334155" />
                <Text className="text-slate-400 mt-4">No cases found matching your criteria.</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
