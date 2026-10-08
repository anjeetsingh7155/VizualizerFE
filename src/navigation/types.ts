import type { NavigatorScreenParams } from '@react-navigation/native';
import type { GalleryItem } from '../types';

/** The three tabs at the bottom of the app. */
export type MainTabParamList = {
  Gallery: undefined;
  Saved: undefined;
  Profile: undefined;
};

/** Every screen in the app. Login and Register open on top of the current screen. */
export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  /** `item` (when known) shows the pictures instantly while fresh details load. */
  Visualization: { id: string; item?: GalleryItem };
  Login: { reason?: 'save' } | undefined;
  Register: { reason?: 'save' } | undefined;
};
