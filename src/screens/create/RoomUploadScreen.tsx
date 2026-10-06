import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CreateStackParamList } from '../../navigation/types';
import { CreateStepLayout } from './CreateStepLayout';
import { UploadCard } from '../../components/image-picker/UploadCard';
import { Button } from '../../components/buttons/Button';
import { useGenerationStore } from '../../store/generationStore';
import { useImagePicker } from '../../hooks/useImagePicker';

type Props = NativeStackScreenProps<CreateStackParamList, 'RoomUpload'>;

export function RoomUploadScreen({ navigation }: Props) {
  const roomUri = useGenerationStore((state) => state.roomUri);
  const setRoomUri = useGenerationStore((state) => state.setRoomUri);
  const pickImage = useImagePicker();

  return (
    <CreateStepLayout
      step={2}
      title="Choose Your Space"
      subtitle="Upload a photo of the room, wall or floor you want to transform."
      footer={<Button title="Continue" disabled={!roomUri} onPress={() => navigation.navigate('Prompt')} />}
    >
      <UploadCard
        title="Choose Room Image"
        hint="Bedroom, living room, bathroom, kitchen, floor or wall"
        imageUri={roomUri}
        onPick={() => pickImage(setRoomUri)}
        onRemove={() => setRoomUri(null)}
      />
    </CreateStepLayout>
  );
}
