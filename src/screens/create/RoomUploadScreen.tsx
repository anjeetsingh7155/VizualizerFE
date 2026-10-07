import { useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CreateStackParamList } from '../../navigation/types';
import { CreateStepLayout } from './CreateStepLayout';
import { UploadCard } from '../../components/image-picker/UploadCard';
import { Button } from '../../components/buttons/Button';
import { useGenerationStore } from '../../store/generationStore';
import { useImagePicker } from '../../hooks/useImagePicker';

type Props = NativeStackScreenProps<CreateStackParamList, 'RoomUpload'>;

export function RoomUploadScreen({ navigation }: Props) {
  const roomImage = useGenerationStore((state) => state.roomImage);
  const setRoomImage = useGenerationStore((state) => state.setRoomImage);
  const pickImage = useImagePicker();
  const [busy, setBusy] = useState(false);

  return (
    <CreateStepLayout
      step={2}
      title="Choose Your Space"
      subtitle="Upload a photo of the room, wall or floor you want to transform."
      footer={
        <Button title="Continue" disabled={!roomImage || busy} onPress={() => navigation.navigate('Prompt')} />
      }
    >
      <UploadCard
        title="Choose Room Image"
        hint="Bedroom, living room, bathroom, kitchen, floor or wall"
        imageUri={roomImage?.uri ?? null}
        busy={busy}
        onPick={() => pickImage({ onPicked: setRoomImage, onBusyChange: setBusy })}
        onRemove={() => setRoomImage(null)}
      />
    </CreateStepLayout>
  );
}
