import type { ComponentProps } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import type { AppTabParamList } from './types';
import { fonts, useTheme } from '../theme';
import { HomeScreen } from '../screens/home/HomeScreen';
import { CreateNavigator } from './CreateNavigator';
import { HistoryScreen } from '../screens/history/HistoryScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';

type IconName = ComponentProps<typeof Ionicons>['name'];

const Tab = createBottomTabNavigator<AppTabParamList>();

const icons: Record<keyof AppTabParamList, [IconName, IconName]> = {
  Home: ['home', 'home-outline'],
  Create: ['add-circle', 'add-circle-outline'],
  History: ['images', 'images-outline'],
  Profile: ['person', 'person-outline'],
};

export function AppNavigator() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarLabelStyle: { fontFamily: fonts.medium, fontSize: 11 },
        tabBarIcon: ({ focused, color, size }) => {
          const [active, inactive] = icons[route.name];
          return <Ionicons name={focused ? active : inactive} size={size - 2} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Create" component={CreateNavigator} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
