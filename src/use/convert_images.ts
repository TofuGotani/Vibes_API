import sharp from "sharp";
import { convertImageOptions } from "../types/use";

async function convertImage(buffer, options: convertImageOptions) {
  return sharp(buffer)
    .jpeg()
    .resize({
      width: options.width,
      height: options.height,
    })
    .toFormat(options.extension ?? "jpeg")
    .toBuffer();
}

export { convertImage };
