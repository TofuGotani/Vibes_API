import Router from "express-promise-router";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import { ocrRouter } from "./api/ocr";

const router = Router();

router.use(ocrRouter);

router.use(
    async (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
      console.log("handle error");
      if (!("status " in err) || err.status === 500) {
        console.error(err);
      }
  
      return res
        .status(err.status || 500)
        .type("application/json")
        .send({ message: err.message });
    }
  );

export { router as apiRouter };
