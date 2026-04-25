import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import sidebarData from '../api/sidebarData.json';
import { useSidebar } from '../context/SidebarContext';

export default function Sidebar(props) {
  const { state, navigation } = props;
  const { isCollapsed } = useSidebar();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState(null);

  // Simulate API calling
  useEffect(() => {
    const fetchSidebarData = async () => {
      setLoading(true);
      // Simulating a network request delay
      setTimeout(() => {
        setMenuItems(sidebarData);
        setLoading(false);
      }, 600);
    };

    fetchSidebarData();
  }, []);

  const handleMenuPress = (item) => {
    if (item.children) {
      // Toggle expansion for menus with children
      setExpandedMenu(expandedMenu === item.name ? null : item.name);
    } else if (item.route) {
      navigation.navigate(item.route);
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: '#1a1814' }}>
      <View className={`px-4 py-4 flex-row items-center ${isCollapsed ? 'justify-center' : ''}`}>
        <View className={`bg-white p-2 rounded-xl shadow-lg ${isCollapsed ? '' : 'mr-3'}`}>
          <Ionicons name="hammer" size={20} color="#090b14" style={{ transform: [{ rotate: '-45deg' }] }} />
        </View>
        {!isCollapsed && (
          <Text className="text-white text-xl font-bold tracking-tight">
            MyLegal<Text className="text-yellow-500">Abode</Text>
          </Text>
        )}
      </View>

      <View className="flex-1 mt-2">
        {loading ? (
          <View className="mt-10 items-center justify-center">
            <ActivityIndicator size="small" color="#eab308" />
            <Text className="text-zinc-500 text-xs mt-4">Loading menu...</Text>
          </View>
        ) : (
          menuItems.map((item, index) => {
            const isActive = state.routes[state.index].name === item.route;
            const isExpanded = expandedMenu === item.name;

            return (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => handleMenuPress(item)}
                  className={`flex-row items-center py-3.5 px-4 rounded-xl mb-1.5 ${isActive ? 'bg-[#2a2618]' : ''} ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <Ionicons
                    name={item.icon}
                    size={20}
                    color={isActive ? '#eab308' : '#a1a1aa'}
                  />
                  {!isCollapsed && (
                    <Text className={`flex-1 ml-4 font-semibold ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                      {item.name}
                    </Text>
                  )}

                  {!isCollapsed && item.badge && (
                    <View className={`w-6 h-6 rounded-full items-center justify-center ${item.badgeColor ? item.badgeColor.split(' ')[0] : 'bg-yellow-500/20'}`}>
                      <Text className={`text-xs font-bold ${item.badgeColor ? item.badgeColor.split(' ')[1] : 'text-yellow-500'}`}>
                        {item.badge}
                      </Text>
                    </View>
                  )}

                  {!isCollapsed && item.children && (
                    <Ionicons
                      name={isExpanded ? "chevron-down" : "chevron-forward"}
                      size={16}
                      color="#a1a1aa"
                    />
                  )}
                </TouchableOpacity>

                {/* Render Child Menus */}
                {!isCollapsed && item.children && isExpanded && (
                  <View className="pl-3 pr-4 py-1 mb-2">
                    {item.children.map((child, childIndex) => {
                      const isChildActive = state.routes[state.index].name === child.route;
                      return (
                        <TouchableOpacity
                          onPress={() => handleMenuPress(child)}
                          className={`flex-row items-center py-2 px-4 rounded-xl mb-1.5 ${isActive ? 'bg-[#2a2618]' : ''}`}
                        >
                          <Ionicons
                            name={child.icon}
                            size={20}
                            color={isChildActive ? '#eab308' : '#a1a1aa'}
                          />
                          <Text className={`font-medium flex-1 ml-4 text-xs ${isChildActive ? 'text-yellow-500' : 'text-zinc-400'}`}>
                            {child.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </View>
            );
          })
        )}
      </View>
    </DrawerContentScrollView>
  );
}
