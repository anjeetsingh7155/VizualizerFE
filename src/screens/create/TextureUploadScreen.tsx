import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CreateStackParamList } from '../../navigation/types';
import { CreateStepLayout } from './CreateStepLayout';
import { UploadCard } from '../../components/image-picker/UploadCard';
import { Button } from '../../components/buttons/Button';
import { useGenerationStore } from '../../store/generationStore';
import { useImagePicker } from '../../hooks/useImagePicker';

type Props = NativeStackScreenProps<CreateStackParamList, 'TextureUpload'>;

export function TextureUploadScreen({ navigation }: Props) {
  const textureUri = useGenerationStore((state) => state.textureUri);
  const setTextureUri = useGenerationStore((state) => state.setTextureUri);
  const pickImage = useImagePicker();

  return (
    <CreateStepLayout
      step={1}
      title="Choose Your Surface"
      subtitle="Upload the tile, marble or texture you want to visualize."
      footer={
        <Button title="Continue" disabled={!textureUri} onPress={() => navigation.navigate('RoomUpload')} />
      }
    >
      <UploadCard
        title="Upload Surface"
        hint="Marble, ceramic tile, granite, wood or stone"
        imageUri={textureUri}
        onPick={() => pickImage(setTextureUri)}
        onRemove={() => setTextureUri(null)}
      />
    </CreateStepLayout>
  );
}
