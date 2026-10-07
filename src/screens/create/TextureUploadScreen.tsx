import { useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CreateStackParamList } from '../../navigation/types';
import { CreateStepLayout } from './CreateStepLayout';
import { UploadCard } from '../../components/image-picker/UploadCard';
import { Button } from '../../components/buttons/Button';
import { useGenerationStore } from '../../store/generationStore';
import { useImagePicker } from '../../hooks/useImagePicker';

type Props = NativeStackScreenProps<CreateStackParamList, 'TextureUpload'>;

export function TextureUploadScreen({ navigation }: Props) {
  const textureImage = useGenerationStore((state) => state.textureImage);
  const setTextureImage = useGenerationStore((state) => state.setTextureImage);
  const pickImage = useImagePicker();
  const [busy, setBusy] = useState(false);

  return (
    <CreateStepLayout
      step={1}
      title="Choose Your Surface"
      subtitle="Upload the tile, marble or texture you want to visualize."
      footer={
        <Button
          title="Continue"
          disabled={!textureImage || busy}
          onPress={() => navigation.navigate('RoomUpload')}
        />
      }
    >
      <UploadCard
        title="Upload Surface"
        hint="Marble, ceramic tile, granite, wood or stone"
        imageUri={textureImage?.uri ?? null}
        busy={busy}
        onPick={() => pickImage({ onPicked: setTextureImage, onBusyChange: setBusy })}
        onRemove={() => setTextureImage(null)}
      />
    </CreateStepLayout>
  );
}
