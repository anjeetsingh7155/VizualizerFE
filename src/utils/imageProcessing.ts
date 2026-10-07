import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import type { ImagePickerAsset } from 'expo-image-picker';
import type { SelectedImage } from '../types';

export const IMAGE_RULES = {
  /** Largest original photo accepted from the phone (before compression). */
  maxSourceBytes: 30 * 1024 * 1024,
  /** The shorter side must be at least this many pixels for a usable result. */
  minSide: 512,
  /** Large photos are scaled down so the longer side is at most this many pixels. */
  maxLongSide: 2048,
  /** JPEG quality (0–1). 0.85 keeps detail while making uploads much smaller. */
  quality: 0.85,
} as const;

export class ImageValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ImageValidationError';
  }
}

function checkSize(width: number, height: number) {
  if (width > 0 && height > 0 && Math.min(width, height) < IMAGE_RULES.minSide) {
    throw new ImageValidationError(
      `This image is too small. Please use a photo at least ${IMAGE_RULES.minSide} pixels wide and tall.`,
    );
  }
}

/**
 * Checks a picked photo and prepares it for upload:
 * rejects non-images, very large files and very small images,
 * scales big photos down and saves them as JPEG (this also converts iPhone HEIC photos).
 */
export async function prepareImage(asset: ImagePickerAsset): Promise<SelectedImage> {
  if ((asset.type && asset.type !== 'image') || (asset.mimeType && !asset.mimeType.startsWith('image/'))) {
    throw new ImageValidationError('Please choose a photo (JPEG, PNG or WEBP).');
  }
  if (asset.fileSize && asset.fileSize > IMAGE_RULES.maxSourceBytes) {
    throw new ImageValidationError('This image is too large. Please choose a photo under 30 MB.');
  }
  checkSize(asset.width, asset.height);

  const context = ImageManipulator.manipulate(asset.uri);
  const longSide = Math.max(asset.width, asset.height);
  if (longSide > IMAGE_RULES.maxLongSide) {
    context.resize(asset.width >= asset.height ? { width: IMAGE_RULES.maxLongSide } : { height: IMAGE_RULES.maxLongSide });
  }

  const rendered = await context.renderAsync();
  try {
    const saved = await rendered.saveAsync({ compress: IMAGE_RULES.quality, format: SaveFormat.JPEG });
    checkSize(saved.width, saved.height);
    return {
      uri: saved.uri,
      width: saved.width,
      height: saved.height,
      mimeType: 'image/jpeg',
      fileName: `image-${Date.now()}.jpg`,
    };
  } finally {
    rendered.release();
    context.release();
  }
}
