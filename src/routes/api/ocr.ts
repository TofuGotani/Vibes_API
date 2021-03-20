import { NextFunction, Request, Response, Router } from "express";
import httpErrors from "http-errors";
import { convertImageOptions } from "../../types/use";
import { checkImage } from "../../use/check_image";
import { convertImage } from "../../use/convert_images";

const EXTENSION = "jpeg";

const router = Router();

router.post("/ocr", async (req: Request, res: Response, next: NextFunction) => {
    //TODO User 認証

    const img = Buffer.from(req.body)
    if (Buffer.isBuffer(img) === false) {
      throw next(new httpErrors.BadRequest("no image"));
    }
  
    const isChecked = await checkImage(img, {});
  
    if (typeof isChecked === "string") {
      throw next(new httpErrors.BadRequest(isChecked));
    }
  
    const options: convertImageOptions = {
      width: isChecked.width,
      height: isChecked.height,
      extension: EXTENSION,
    };
    const converted = await convertImage(img, options);
    //TODO LINE API
  
    return res.status(200).type("application/json").send(converted.toJSON());
  });
  
  export { router as ocrRouter };
  
