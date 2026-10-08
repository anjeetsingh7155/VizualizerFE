import type { ComponentProps } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import type { MainTabParamList } from './types';
import { fonts, useTheme } from '../theme';
import { GalleryScreen } from '../screens/gallery/GalleryScreen';
import { SavedScreen } from '../screens/saved/SavedScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';

type IconName = ComponentProps<typeof Ionicons>['name'];

const Tab = createBottomTabNavigator<MainTabParamList>();

const icons: Record<keyof MainTabParamList, [IconName, IconName]> = {
  Gallery: ['images', 'images-outline'],
  Saved: ['bookmark', 'bookmark-outline'],
  Profile: ['person', 'person-outline'],
};

/** The bottom tabs: Gallery (open to everyone), Saved and Profile. */
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
      <Tab.Screen name="Gallery" component={GalleryScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
