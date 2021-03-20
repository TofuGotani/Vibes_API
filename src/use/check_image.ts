import sharp from "sharp";
import { checkImageOptions, checkImageReturn } from "../types/use";

async function checkImage(
  buffer,
  options: checkImageOptions
): Promise<checkImageReturn | string> {
  const MAX_LENGTH = 1960;
  const MIN_LENGTH = 10;
  const MIN_DPI = 150;

  const metadata = await sharp(buffer).metadata();

  if (metadata.density < MIN_DPI) {
    return "DPI is too low";
  }

  const majorLength = Math.max(metadata.width, metadata.height);

  if (majorLength < MIN_LENGTH) {
    return "Image is too small";
  }

  const isBigger = metadata.height >= metadata.width ? "height" : "width";

  if (metadata.width > MAX_LENGTH || metadata.height > MAX_LENGTH) {
    if (isBigger == "height") {
      return {
        height: MAX_LENGTH,
        width: null,
      };
    } else {
      return {
        height: null,
        width: MAX_LENGTH,
      };
    }
  }else{
    return {
      height:metadata.height,
      width:metadata.width
    }
  }
}

export { checkImage };
