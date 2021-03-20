import Router from "express-promise-router";
import httpErrors from "http-errors";

import { ocrRouter } from "./api/ocr";

const router = Router();

router.use(ocrRouter);

router.use(async (err, _req, res, _next) => {
  if (!("status " in err) || err.status === 500) {
    console.error(err);
  }

  return res
    .status(err.status || 500)
    .type("application/json")
    .send({ message: err.message });
});

export { router as apiRouter };
