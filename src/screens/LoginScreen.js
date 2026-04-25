import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, useWindowDimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { width } = useWindowDimensions();

  const isLargeScreen = width >= 1024;

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error('Please enter both username and password');
      return;
    }

    setIsSigningIn(true);

    try {
      // Small delay to show loader
      await new Promise(resolve => setTimeout(resolve, 800));

      let users = [];
      try {
        const response = await axios.get('/users.json');
        users = response.data;
      } catch (err) {
        users = require('../../public/users.json');
      }

      const validUser = users.find(u => u.username === username.toLowerCase() && u.password === password);
      
      if (validUser) {
        toast.success(`Welcome back, ${validUser.name}!`);
        login();
      } else {
        toast.error('The username or password you entered is incorrect.');
        setIsSigningIn(false);
      }
    } catch (error) {
      toast.error('Could not complete login request.');
      setIsSigningIn(false);
      console.error(error);
    }
  };

  const FeatureCard = ({ icon, title, description, iconColor = "#94a3b8", iconBg = "bg-slate-800" }) => (
    <View className="bg-[#111827] rounded-xl p-3 mb-3 w-[48%] border border-slate-800/50 shadow-sm">
      <View className={`w-8 h-8 ${iconBg} rounded-full items-center justify-center mb-2`}>
        <Ionicons name={icon} size={16} color={iconColor} />
      </View>
      <Text className="text-white font-bold text-sm mb-1">{title}</Text>
      <Text className="text-slate-400 text-xs leading-tight" numberOfLines={2}>{description}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#090b14]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 flex-row"
      >
        {/* Left Column - Branding and Features (Hidden on smaller screens) */}
        {isLargeScreen && (
          <View className="flex-1 w-1/2 px-12 py-8 justify-center">
            <View className="max-w-xl mx-auto w-full">
              <View className="flex-row items-center mb-6">
                <View className="bg-white p-2 rounded-xl mr-3 shadow-lg">
                  <Ionicons name="hammer" size={24} color="#090b14" style={{ transform: [{ rotate: '-45deg' }] }} />
                </View>
                <Text className="text-white text-2xl font-bold tracking-tight">
                  MyLegal<Text className="text-[#d9a01c]">Abode</Text>
                </Text>
              </View>

              <Text className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-1">
                Your companion for
              </Text>
              <Text className="text-white text-4xl font-bold mb-4">
                Modern <Text className="text-[#d9a01c]">Case Management</Text>
              </Text>
              <Text className="text-slate-400 text-sm mb-6 leading-relaxed">
                Data-driven workflows for law firms—manage matters, documents, deadlines, and client communication with clarity and confidence.
              </Text>

              <View className="flex-row flex-wrap justify-between">
                <FeatureCard
                  icon="scale-outline"
                  iconColor="#d9a01c"
                  iconBg="bg-[#1e1c15]"
                  title="Matters"
                  description="Track cases, parties, and status updates."
                />
                <FeatureCard
                  icon="folder-open-outline"
                  iconColor="#d9a01c"
                  iconBg="bg-[#1e1c15]"
                  title="Documents"
                  description="Store filings and drafts in one place."
                />
                <FeatureCard
                  icon="alarm-outline"
                  iconColor="#ec4899"
                  iconBg="bg-pink-900/30"
                  title="Deadlines"
                  description="Stay ahead with reminders and calendars."
                />
                <FeatureCard
                  icon="people-outline"
                  iconColor="#a855f7"
                  iconBg="bg-purple-900/30"
                  title="Team Management"
                  description="Manage staff roles, access, and assignments."
                />
                <FeatureCard
                  icon="lock-closed-outline"
                  iconColor="#d9a01c"
                  iconBg="bg-[#1e1c15]"
                  title="Security"
                  description="Role-based access & audit visibility."
                />
                <FeatureCard
                  icon="chatbubble-ellipses-outline"
                  iconColor="#cbd5e1"
                  iconBg="bg-slate-700/50"
                  title="Client Updates"
                  description="Keep clients informed with less effort."
                />
              </View>
            </View>
          </View>
        )}

        {/* Right Column - Login Panel */}
        <View className={`flex-1 justify-center items-center p-6 ${isLargeScreen ? 'w-1/2' : 'w-full'}`}>
          <View className="bg-[#111827] w-full max-w-md p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl">

            {!isLargeScreen && (
              <View className="flex-row items-center justify-center mb-6">
                <View className="bg-white p-2 rounded-xl mr-3 shadow-lg">
                  <Ionicons name="hammer" size={20} color="#090b14" style={{ transform: [{ rotate: '-45deg' }] }} />
                </View>
                <Text className="text-white text-xl font-bold tracking-tight">
                  MyLegal<Text className="text-[#d9a01c]">Abode</Text>
                </Text>
              </View>
            )}

            <View className="flex-row items-center mb-6">
              {isLargeScreen && (
                <View className="bg-white w-14 h-14 rounded-full items-center justify-center mr-4 shadow-lg border-2 border-slate-800">
                  <Ionicons name="hammer" size={28} color="#090b14" style={{ transform: [{ rotate: '-45deg' }] }} />
                </View>
              )}
              <View>
                <Text className="text-white text-2xl font-bold mb-1">Welcome back</Text>
                <Text className="text-slate-400 text-xs">Sign in to continue to MyLegalAbode.</Text>
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-white font-medium mb-1.5 text-xs">Username</Text>
              <TextInput
                className="bg-[#1e293b]/50 text-white px-4 py-3.5 rounded-xl border border-slate-700 focus:border-[#d9a01c]"
                placeholder="Enter your username"
                placeholderTextColor="#64748b"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View className="mb-4">
              <Text className="text-white font-medium mb-1.5 text-xs">Password</Text>
              <View className="relative justify-center">
                <TextInput
                  className="bg-[#1e293b]/50 text-white px-4 py-3.5 rounded-xl border border-slate-700 focus:border-[#d9a01c] pr-12"
                  placeholder="Enter your password"
                  placeholderTextColor="#64748b"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  className="absolute right-4"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={18} color="#94a3b8" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity className="mb-6 items-end">
              <Text className="text-[#d9a01c] font-semibold text-xs">Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className={`bg-[#d9a01c] rounded-xl py-3.5 items-center mb-5 shadow-lg shadow-yellow-900/20 flex-row justify-center ${isSigningIn ? 'opacity-80' : ''}`}
              onPress={handleLogin}
              disabled={isSigningIn}
            >
              {isSigningIn ? (
                <>
                  <ActivityIndicator color="#090b14" size="small" className="mr-2" />
                  <Text className="text-[#090b14] font-bold text-base">Signing in...</Text>
                </>
              ) : (
                <Text className="text-[#090b14] font-bold text-base">Sign in</Text>
              )}
            </TouchableOpacity>

          </View>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
