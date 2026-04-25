import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Select from 'react-select';
import { initialTableData } from '../data/caseData';
import CaseGridView from '../components/CaseGridView';
import CaseKanbanView from '../components/CaseKanbanView';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => { setDebouncedValue(value); }, delay);
    return () => { clearTimeout(handler); };
  }, [value, delay]);
  return debouncedValue;
}

const typeOptions = [
  { value: '', label: 'All Types' },
  { value: 'Criminal', label: 'Criminal' },
  { value: 'Civil', label: 'Civil' },
  { value: 'Family', label: 'Family' },
  { value: 'Tax', label: 'Tax' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Corporate', label: 'Corporate' }
];

const riskOptions = [
  { value: '', label: 'All Risks' },
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' }
];

const customSelectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: '#111827',
    borderColor: '#334155',
    color: '#fff',
    minWidth: 160,
    minHeight: 42,
    borderRadius: 12,
    boxShadow: 'none',
    '&:hover': { borderColor: '#475569' }
  }),
  singleValue: (base) => ({ ...base, color: '#fff', fontSize: 14 }),
  menu: (base) => ({ ...base, backgroundColor: '#111827', zIndex: 100, border: '1px solid #334155', borderRadius: 12 }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected ? '#fbbf24' : isFocused ? '#1e293b' : '#111827',
    color: isSelected ? '#000' : '#fff',
    cursor: 'pointer'
  }),
  indicatorSeparator: () => ({ display: 'none' })
};

export default function CaseScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [selectedType, setSelectedType] = useState(typeOptions[0]);
  const [selectedRisk, setSelectedRisk] = useState(riskOptions[0]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'kanban'

  const filteredData = initialTableData.filter(row => {
    const matchQuery = row.title.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                       row.clientName.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                       row.id.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchType = selectedType.value === '' || row.type === selectedType.value;
    const matchRisk = selectedRisk.value === '' || row.risk === selectedRisk.value;
    return matchQuery && matchType && matchRisk;
  });

  return (
    <View className="flex-1 bg-[#090b14] relative">
      <View className="flex-1 p-4 lg:p-8">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-white text-2xl font-bold mb-1">Cases</Text>
          <Text className="text-slate-400 text-sm">{viewMode === 'grid' ? 'Grid view' : 'Kanban board'} • {filteredData.length} cases in view</Text>
        </View>

        {/* Toolbar - Wrapped in ScrollView for single-line responsive layout */}
        <View className="mb-6 z-50">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', gap: 12 }}>
            <View className="bg-[#111827] flex-row items-center px-4 h-[42px] rounded-xl border border-slate-700 min-w-[240px]">
              <Ionicons name="search" size={18} color="#94a3b8" />
              <TextInput 
                placeholder="Search cases..."
                placeholderTextColor="#64748b"
                className="text-white ml-2 flex-1 text-sm outline-none"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {Platform.OS === 'web' ? (
              <>
                <View className="z-50 min-w-[160px]">
                  <Select 
                    options={typeOptions}
                    value={selectedType}
                    onChange={setSelectedType}
                    styles={customSelectStyles}
                    isSearchable={false}
                  />
                </View>
                <View className="z-50 min-w-[160px]">
                  <Select 
                    options={riskOptions}
                    value={selectedRisk}
                    onChange={setSelectedRisk}
                    styles={customSelectStyles}
                    isSearchable={false}
                  />
                </View>
              </>
            ) : (
              <>
                <TouchableOpacity className="bg-[#111827] flex-row items-center px-4 h-[42px] rounded-xl border border-slate-700">
                  <Text className="text-white text-sm mr-2">{selectedType.label}</Text>
                  <Ionicons name="chevron-down" size={16} color="#94a3b8" />
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#111827] flex-row items-center px-4 h-[42px] rounded-xl border border-slate-700">
                  <Text className="text-white text-sm mr-2">{selectedRisk.label}</Text>
                  <Ionicons name="chevron-down" size={16} color="#94a3b8" />
                </TouchableOpacity>
              </>
            )}

            <View className="flex-row bg-[#111827] rounded-xl border border-slate-700 h-[42px] overflow-hidden">
              <TouchableOpacity 
                className={`flex-row items-center px-4 h-full ${viewMode === 'kanban' ? 'bg-[#1e293b]' : ''}`}
                onPress={() => setViewMode('kanban')}
              >
                <Ionicons name="grid-outline" size={16} color={viewMode === 'kanban' ? '#fbbf24' : '#94a3b8'} />
                <Text className={`${viewMode === 'kanban' ? 'text-white' : 'text-slate-400'} text-sm ml-2 font-medium`}>Kanban</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className={`flex-row items-center px-4 h-full ${viewMode === 'grid' ? 'bg-[#1e293b]' : ''}`}
                onPress={() => setViewMode('grid')}
              >
                <Ionicons name="list" size={16} color={viewMode === 'grid' ? '#fbbf24' : '#94a3b8'} />
                <Text className={`${viewMode === 'grid' ? 'text-white' : 'text-slate-400'} text-sm ml-2 font-medium`}>Grid</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity className="bg-[#fbbf24] flex-row items-center px-4 h-[42px] rounded-xl">
              <Ionicons name="add" size={18} color="#000" />
              <Text className="text-black font-bold text-sm ml-1">New Case</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-transparent flex-row items-center px-4 h-[42px] rounded-xl border border-slate-700">
              <Ionicons name="archive-outline" size={18} color="#cbd5e1" />
              <Text className="text-slate-300 text-sm ml-2 font-medium">Archived</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Content Area */}
        {viewMode === 'grid' ? (
          <CaseGridView data={filteredData} onSelectCase={setSelectedCase} />
        ) : (
          <CaseKanbanView data={filteredData} onSelectCase={setSelectedCase} />
        )}

      </View>

      {/* Side Panel Overlay */}
      {selectedCase && (
        <>
          <TouchableOpacity 
            className="absolute top-0 bottom-0 left-0 right-0 bg-black/60 z-40" 
            activeOpacity={1} 
            onPress={() => setSelectedCase(null)} 
          />
          <View className="absolute top-0 bottom-0 right-0 w-full sm:w-[80%] md:w-[60%] lg:w-[45%] bg-[#0f1423] z-50 shadow-2xl border-l border-slate-800">
            <ScrollView className="flex-1">
              {/* Panel Header */}
              <View className="p-6 border-b border-slate-800/50">
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-slate-400 text-xs font-bold tracking-wider">{selectedCase.id}</Text>
                  <TouchableOpacity onPress={() => setSelectedCase(null)} className="w-8 h-8 bg-slate-800 rounded-full items-center justify-center hover:bg-slate-700">
                    <Ionicons name="close" size={18} color="#94a3b8" />
                  </TouchableOpacity>
                </View>
                <Text className="text-white text-2xl font-bold mb-4">{selectedCase.title}</Text>
                
                <View className="flex-row flex-wrap gap-2">
                  <View className="bg-yellow-900/40 border border-yellow-700/50 px-3 py-1.5 rounded-full">
                    <Text className="text-yellow-500 font-bold text-xs">{selectedCase.status}</Text>
                  </View>
                  <View className="bg-red-900/40 border border-red-700/50 px-3 py-1.5 rounded-full">
                    <Text className="text-red-400 font-bold text-xs">{selectedCase.risk} Risk</Text>
                  </View>
                  <View className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full">
                    <Text className="text-slate-300 font-bold text-xs">{selectedCase.type}</Text>
                  </View>
                </View>
              </View>

              {/* Progress Steps */}
              <View className="p-6 border-b border-slate-800/50">
                <View className="flex-row items-center justify-between px-2 mb-2">
                  <View className="items-center">
                    <View className="w-8 h-8 rounded-full bg-emerald-500 items-center justify-center z-10 mb-2">
                      <Ionicons name="checkmark" size={16} color="#000" />
                    </View>
                    <Text className="text-white text-[10px] font-bold">Filed</Text>
                  </View>
                  <View className="flex-1 h-0.5 bg-emerald-500 mx-2 -mt-4" />
                  
                  <View className="items-center">
                    <View className="w-8 h-8 rounded-full bg-emerald-500 items-center justify-center z-10 mb-2">
                      <Ionicons name="checkmark" size={16} color="#000" />
                    </View>
                    <Text className="text-white text-[10px] font-bold">Docs Received</Text>
                  </View>
                  <View className="flex-1 h-0.5 bg-emerald-500 mx-2 -mt-4" />

                  <View className="items-center">
                    <View className="w-8 h-8 rounded-full bg-emerald-500 items-center justify-center z-10 mb-2">
                      <Ionicons name="checkmark" size={16} color="#000" />
                    </View>
                    <Text className="text-white text-[10px] font-bold">Under Review</Text>
                  </View>
                  <View className="flex-1 h-0.5 bg-emerald-500 mx-2 -mt-4" />

                  <View className="items-center">
                    <View className="w-8 h-8 rounded-full bg-yellow-500 items-center justify-center z-10 mb-2 ring-4 ring-yellow-500/20" />
                    <Text className="text-yellow-500 text-[10px] font-bold">Hearing Set</Text>
                  </View>
                  <View className="flex-1 h-0.5 bg-slate-800 mx-2 -mt-4" />

                  <View className="items-center">
                    <View className="w-8 h-8 rounded-full bg-slate-700 items-center justify-center z-10 mb-2" />
                    <Text className="text-slate-400 text-[10px] font-bold">Judgement</Text>
                  </View>
                </View>
              </View>

              {/* Tabs */}
              <View className="flex-row px-6 border-b border-slate-800/50 pt-2">
                <View className="border-b-2 border-yellow-500 pb-3 mr-6">
                  <Text className="text-white font-bold text-sm">Overview</Text>
                </View>
                <Text className="text-slate-400 font-medium text-sm mr-6 pb-3 hover:text-slate-300">Client Profile</Text>
                <Text className="text-slate-400 font-medium text-sm mr-6 pb-3 hover:text-slate-300">Calendar</Text>
                <Text className="text-slate-400 font-medium text-sm mr-6 pb-3 hover:text-slate-300">Documents</Text>
                <Text className="text-slate-400 font-medium text-sm mr-6 pb-3 hover:text-slate-300">Notes</Text>
                <Text className="text-slate-400 font-medium text-sm pb-3 hover:text-slate-300">Activity</Text>
              </View>

              {/* Grid Content */}
              <View className="p-6 flex-row flex-wrap justify-between">
                <View className="w-[48%] bg-slate-900/50 p-4 rounded-xl border border-slate-800 mb-4">
                  <Text className="text-slate-500 text-[10px] font-bold tracking-wider mb-1">COURT</Text>
                  <Text className="text-white font-bold">{selectedCase?.court || 'TBD'}</Text>
                </View>
                <View className="w-[48%] bg-slate-900/50 p-4 rounded-xl border border-slate-800 mb-4">
                  <Text className="text-slate-500 text-[10px] font-bold tracking-wider mb-1">JUDGE</Text>
                  <Text className="text-white font-bold">{selectedCase?.judge || 'TBD'}</Text>
                </View>
                <View className="w-[48%] bg-slate-900/50 p-4 rounded-xl border border-slate-800 mb-4">
                  <Text className="text-slate-500 text-[10px] font-bold tracking-wider mb-1">OPPONENT</Text>
                  <Text className="text-white font-bold">{selectedCase?.opponent || 'TBD'}</Text>
                </View>
                <View className="w-[48%] bg-slate-900/50 p-4 rounded-xl border border-slate-800 mb-4">
                  <Text className="text-slate-500 text-[10px] font-bold tracking-wider mb-1">OPP. ADVOCATE</Text>
                  <Text className="text-white font-bold">{selectedCase?.oppAdvocate || 'TBD'}</Text>
                </View>
                <View className="w-[48%] bg-slate-900/50 p-4 rounded-xl border border-slate-800 mb-4">
                  <Text className="text-slate-500 text-[10px] font-bold tracking-wider mb-1">FILED</Text>
                  <Text className="text-white font-bold">{selectedCase?.filedDate || 'TBD'}</Text>
                </View>
                <View className="w-[48%] bg-slate-900/50 p-4 rounded-xl border border-slate-800 mb-4">
                  <Text className="text-slate-500 text-[10px] font-bold tracking-wider mb-1">NEXT HEARING</Text>
                  <Text className="text-white font-bold">{selectedCase?.hearingDate || 'TBD'}</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
}
