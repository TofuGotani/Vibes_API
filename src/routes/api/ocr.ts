import { NextFunction, request, Request, Response, Router } from "express";
import httpErrors from "http-errors";
import { convertImageOptions } from "../../types/use";
import { checkImage } from "../../use/check_image";
import { convertImage } from "../../use/convert_images";
import { v4 as uuidv4 } from "uuid";
import HttpRequest from "request";
import { IP } from "../../model/ip";

const EXTENSION = "jpeg";

const router = Router();

const controlAccess = () => {
  var accessCount = 0;
  var time = Date.now();
  const ACCESSLIMIT = 2;
  const REFRESHTIME = 60 * 1000; //ms

  const add = () => {
    accessCount += 1;
  };

  const reset = () => {
    accessCount = 0;
  };

  const checkCount = () => {
    return accessCount > ACCESSLIMIT;
  };

  const checkTime = () => {
    // console.log(Date.now());
    if (Date.now() - time > REFRESHTIME) {
      reset();
      time = Date.now();
    }
  };

  const setValues = (_count: number, _time: number) => {
    accessCount = _count;
    time = _time;
  };

  const getCount = () => {
    return accessCount;
  };

  const getTime = () => {
    return time;
  };

  return { add, checkCount, checkTime, setValues, getCount, getTime };
};

const managerAccess = controlAccess();

router.post("/ocr", async (req: Request, res: Response, next: NextFunction) => {
  const ip = await IP.findOrCreate({
    where: { ip: req.ip },
    defaults: {
      id: uuidv4(),
      ip: req.ip,
      access_count: 0,
      last_access_time: Date.now(),
    },
  }).then(([ip, _]) => {
    return ip;
  });

  managerAccess.setValues(
    ip.getDataValue("access_count"),
    ip.getDataValue("last_access_time")
  );

  managerAccess.checkTime();

  const base64img = req.body["data"].split(";base64,").pop();
  const img = Buffer.from(base64img, "base64");

  if (Buffer.isBuffer(img) === false) {
    throw next(new httpErrors.BadRequest("no image"));
  }

  const isChecked = await checkImage(img, {});

  if (typeof isChecked === "string") {
    throw next(new httpErrors.BadRequest(isChecked));
  }
  const imgOptions: convertImageOptions = {
    width: isChecked.width,
    height: isChecked.height,
    extension: EXTENSION,
  };
  const converted = await convertImage(img, imgOptions);

  if (managerAccess.checkCount()) {
    throw next(new httpErrors.BadRequest("too many requests !"));
  }
  //TODO LINE API
  const ocrOptions = {
    uri:
      process.env.URL,
    headers: {
      "X-OCR-SECRET": process.env.SECRET,
      "Content-Type": "application/json",
    },
    json: {
      images: [
        {
          format: "jpg",
          name: "demo",
          data: converted.toString("base64"),
        },
      ],
      version: "V2",
      requestId: uuidv4(),
      timestamp: Math.floor(Date.now() / 1000),
      lang: "ja",
    },
  };

  HttpRequest.post(ocrOptions, (err, resp, _body) => {
    managerAccess.add();
    // console.log(resp.body);

    IP.update(
      {
        access_count: managerAccess.getCount(),
        last_access_time: managerAccess.getTime(),
      },
      { where: { id: ip.getDataValue("id") } }
    );
    return res.status(200).type("application/json").send(resp.body);
  });
});

export { router as ocrRouter };
