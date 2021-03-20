import { Router } from "express";
import httpErrors from "http-errors";
import { convertImageOptions } from "../../types/use";
import { checkImage } from "../../use/check_image";
import { convertImage } from "../../use/convert_images";

const EXTENSION = "jpeg";

const router = Router();

router.post("/ocr", async (req, res) => {
  //TODO User 認証

  if (Buffer.isBuffer(req.body) === false) {
    throw new httpErrors.BadRequest("no image");
  }

  const isChecked = await checkImage(req.body, {});

  if (typeof isChecked === "string") {
    throw new httpErrors.BadRequest(isChecked);
  }

  const options: convertImageOptions = {
    width: isChecked.width,
    height: isChecked.height,
    extension: EXTENSION,
  };
  const converted = await convertImage(req.body, options);

  //TODO LINE API

  return res.status(200).type("application/json").send({ msg: "success" });
});

export { router as ocrRouter };
