import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import COLORS from '@/common/assets/constants/Color';


export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: COLORS.headerColor, tabBarStyle: { backgroundColor: COLORS.tabcolor },
      headerStyle: {
        backgroundColor: COLORS.headerColor},
        headerTitleStyle:{
          color:COLORS.white
        }
    }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarLabelStyle: { fontSize: 12, fontWeight: 600 },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Cart"
        options={{
          title: 'Cart',
          tabBarLabelStyle: { fontSize: 12, fontWeight: 600 },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cart-plus" color={color} />,

        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarLabelStyle: { fontSize: 12, fontWeight: 600 },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />
        }}
      />

    </Tabs>
  );
}
