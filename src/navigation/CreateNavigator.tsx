import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { CreateStackParamList } from './types';
import { useTheme } from '../theme';
import { CreateVisualizationScreen } from '../screens/create/CreateVisualizationScreen';
import { TextureUploadScreen } from '../screens/create/TextureUploadScreen';
import { RoomUploadScreen } from '../screens/create/RoomUploadScreen';
import { PromptScreen } from '../screens/create/PromptScreen';

const Stack = createNativeStackNavigator<CreateStackParamList>();

export function CreateNavigator() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerShadowVisible: false,
        headerBackButtonDisplayMode: 'minimal',
        headerTintColor: colors.text,
        headerStyle: { backgroundColor: colors.background },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="CreateIntro" component={CreateVisualizationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TextureUpload" component={TextureUploadScreen} />
      <Stack.Screen name="RoomUpload" component={RoomUploadScreen} />
      <Stack.Screen name="Prompt" component={PromptScreen} />
    </Stack.Navigator>
  );
}
