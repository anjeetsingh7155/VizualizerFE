import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type CreateStackParamList = {
  CreateIntro: undefined;
  TextureUpload: undefined;
  RoomUpload: undefined;
  Prompt: undefined;
};

export type AppTabParamList = {
  Home: undefined;
  Create: NavigatorScreenParams<CreateStackParamList>;
  History: undefined;
  Profile: undefined;
};
