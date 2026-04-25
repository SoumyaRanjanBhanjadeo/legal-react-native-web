import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function CaseKanbanView({ data, onSelectCase }) {
  const [isConfigured, setIsConfigured] = useState(false);
  const [showConfig, setShowConfig] = useState(true);

  // Custom columns defined by user dynamically
  const [customColumns, setCustomColumns] = useState(['New', 'Docs Pending', 'Under Review', 'Hearing Scheduled']);
  const [newColumnName, setNewColumnName] = useState('');

  const [columnsData, setColumnsData] = useState({});

  useEffect(() => {
    if (isConfigured) {
      const grouped = {};
      customColumns.forEach(col => {
        // Group items that match the column status, or unassigned ones if not found
        grouped[col] = data.filter(item => item.status === col || (item.status === 'Hearing Scheduled' && col === 'Hearing Scheduled'));
      });
      // Fallback: Place everything else into the first column if no match found
      data.forEach(item => {
        if (!customColumns.includes(item.status)) {
          if (grouped[customColumns[0]]) {
            const exists = grouped[customColumns[0]].find(i => i.id === item.id);
            if (!exists) grouped[customColumns[0]].push(item);
          }
        }
      });
      setColumnsData(grouped);
    }
  }, [data, customColumns, isConfigured]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceCol = columnsData[source.droppableId];
      const destCol = columnsData[destination.droppableId];
      const sourceItems = [...sourceCol];
      const destItems = [...destCol];

      const [removed] = sourceItems.splice(source.index, 1);
      removed.status = destination.droppableId;
      destItems.splice(destination.index, 0, removed);

      setColumnsData({
        ...columnsData,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems
      });
    } else {
      const column = columnsData[source.droppableId];
      const copiedItems = [...column];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumnsData({
        ...columnsData,
        [source.droppableId]: copiedItems
      });
    }
  };

  const handleAddColumn = () => {
    if (newColumnName.trim() !== '' && !customColumns.includes(newColumnName.trim())) {
      setCustomColumns([...customColumns, newColumnName.trim()]);
      setNewColumnName('');
    }
  };

  const handleRemoveColumn = (col) => {
    setCustomColumns(customColumns.filter(c => c !== col));
  };

  const handleSaveConfig = () => {
    if (customColumns.length === 0) return;
    setIsConfigured(true);
    setShowConfig(false);
  };

  if (!isConfigured || showConfig) {
    return (
      <View className="flex-1 bg-[#111827] rounded-2xl border border-slate-800 items-center justify-center z-50 p-4">
        <View className="bg-[#0b1120] rounded-2xl border border-slate-700 w-full max-w-md shadow-2xl max-h-[95%] overflow-hidden">
          <ScrollView contentContainerStyle={{ padding: 32 }} showsVerticalScrollIndicator={true}>
            <View className="w-12 h-12 bg-blue-500/20 rounded-full items-center justify-center mb-4">
              <Ionicons name="options" size={24} color="#60a5fa" />
            </View>
            <Text className="text-white text-2xl font-bold mb-2">Create Custom Board</Text>
            <Text className="text-slate-400 text-sm mb-6">Dynamically create your own status columns (e.g. New, Todo, Approved).</Text>
            
            <View className="flex-row items-center mb-6">
              <TextInput
                value={newColumnName}
                onChangeText={setNewColumnName}
                placeholder="E.g., In Progress..."
                placeholderTextColor="#64748b"
                className="flex-1 bg-[#111827] border border-slate-700 rounded-xl px-4 py-3 text-white mr-3"
              />
              <TouchableOpacity onPress={handleAddColumn} className="bg-blue-600 rounded-xl px-4 py-3 items-center justify-center flex-row">
                <Ionicons name="add" size={18} color="#fff" />
                <Text className="text-white font-bold ml-1">Add</Text>
              </TouchableOpacity>
            </View>

            <View className="mb-6">
              {customColumns.map((col, idx) => (
                <View key={idx} className="flex-row items-center justify-between py-3 border-b border-slate-800">
                  <View className="flex-row items-center">
                    <Ionicons name="menu" size={16} color="#64748b" className="mr-3" />
                    <Text className="text-slate-200 font-medium">{col}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleRemoveColumn(col)} className="p-1">
                    <Ionicons name="trash-outline" size={18} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}
              {customColumns.length === 0 && (
                <Text className="text-slate-500 text-center py-4">No columns added yet.</Text>
              )}
            </View>

            <TouchableOpacity 
              className={`rounded-xl py-3.5 items-center mt-2 ${customColumns.length === 0 ? 'bg-slate-700' : 'bg-yellow-500'}`}
              onPress={handleSaveConfig}
              disabled={customColumns.length === 0}
            >
              <Text className={`font-bold text-base ${customColumns.length === 0 ? 'text-slate-400' : 'text-black'}`}>Generate Board</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }

  if (Platform.OS !== 'web') {
    return (
      <View className="flex-1 bg-[#111827] rounded-2xl border border-slate-800 items-center justify-center p-6">
        <Ionicons name="warning-outline" size={48} color="#fbbf24" />
        <Text className="text-white text-lg font-bold mt-4 text-center">Kanban is Web Only</Text>
        <Text className="text-slate-400 mt-2 text-center">Drag and drop features are currently optimized for the web dashboard.</Text>
      </View>
    );
  }

  // Pure web rendering for Drag and Drop using standard React Native UI wrapped in dom elements
  return (
    <View className="flex-1 rounded-2xl overflow-hidden mt-4">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', height: '100%' }}>
            {customColumns.map(columnId => {
              const columnItems = columnsData[columnId] || [];
              return (
                <div key={columnId} style={{ display: 'flex', flexDirection: 'column', width: 340, marginRight: 16, backgroundColor: 'transparent', maxHeight: '100%' }}>
                  {/* Column Header */}
                  <View className="bg-[#0b1120] border border-slate-800 rounded-t-xl px-4 py-3 flex-row justify-between items-center mb-1">
                    <Text className="text-white font-bold">{columnId}</Text>
                    <View className="bg-slate-800 px-2.5 py-0.5 rounded-full">
                      <Text className="text-white text-xs font-bold">{columnItems.length}</Text>
                    </View>
                  </View>

                  {/* Droppable Area */}
                  <Droppable droppableId={columnId}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          padding: 8,
                          minHeight: 150,
                          flex: 1,
                          overflowY: 'auto',
                          backgroundColor: snapshot.isDraggingOver ? '#111827' : '#0b1120',
                          borderLeft: '1px solid #1e293b',
                          borderRight: '1px solid #1e293b',
                          borderBottom: '1px solid #1e293b',
                          borderBottomLeftRadius: 16,
                          borderBottomRightRadius: 16,
                        }}
                      >
                        {columnItems.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: 'none',
                                  marginBottom: 12,
                                  ...provided.draggableProps.style
                                }}
                              >
                                {/* Native UI inside Draggable Div */}
                                <View className={`bg-[#111827] rounded-xl border p-4 shadow-lg ${snapshot.isDragging ? 'border-yellow-500 shadow-yellow-900/20' : 'border-slate-800'}`}>

                                  <View className="flex-row justify-between mb-3 items-center">
                                    <Text className="text-slate-400 text-xs font-bold tracking-widest">{item.id}</Text>
                                    <View className="flex-row gap-1">
                                      <TouchableOpacity onPress={() => onSelectCase(item)} className="w-7 h-7 bg-slate-800 rounded-md border border-slate-700 items-center justify-center hover:bg-slate-700">
                                        <Ionicons name="eye-outline" size={14} color="#cbd5e1" />
                                      </TouchableOpacity>
                                      <TouchableOpacity className="w-7 h-7 bg-slate-800 rounded-md border border-slate-700 items-center justify-center hover:bg-slate-700">
                                        <Ionicons name="pencil-outline" size={14} color="#cbd5e1" />
                                      </TouchableOpacity>
                                      <TouchableOpacity className="w-7 h-7 bg-slate-800 rounded-md border border-slate-700 items-center justify-center hover:bg-slate-700">
                                        <Ionicons name="person-add-outline" size={14} color="#cbd5e1" />
                                      </TouchableOpacity>
                                      <TouchableOpacity className="w-7 h-7 bg-slate-800 rounded-md border border-slate-700 items-center justify-center hover:bg-slate-700">
                                        <Ionicons name="document-text-outline" size={14} color="#cbd5e1" />
                                      </TouchableOpacity>
                                    </View>
                                  </View>

                                  <Text className="text-white font-bold text-[15px] mb-3 leading-tight">{item.title}</Text>

                                  <View className="flex-row items-center mb-3">
                                    <View className="w-6 h-6 rounded-full bg-slate-700 items-center justify-center mr-2">
                                      <Text className="text-white text-[10px] font-bold">{item.clientInitials}</Text>
                                    </View>
                                    <Text className="text-slate-300 text-xs flex-1">{item.clientName}</Text>
                                  </View>

                                  <View className="flex-row justify-between items-center mt-1">
                                    <View className="bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
                                      <Text className="text-slate-300 text-[10px] font-bold">{item.type}</Text>
                                    </View>
                                    <Text className="text-slate-500 text-[11px] font-medium">{item.nextHearing.replace('\n', ' ')}</Text>
                                  </View>

                                </View>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </ScrollView>
    </View>
  );
}
