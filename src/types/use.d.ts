import { FormatEnum, AvailableFormatInfo } from "sharp";

export interface convertImageOptions {
  width: number | null;
  height: number | null;
  extension?: keyof FormatEnum | AvailableFormatInfo;
}

export interface checkImageOptions {
  extension?: keyof FormatEnum | AvailableFormatInfo;
}

export interface checkImageReturn {
  height: number | null;
  width: number | null;
}
