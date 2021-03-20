import Express from "express";
import session from "express-session";


import { apiRouter } from "./routes/api";

const app = Express();

app.set("trust proxy", true);

app.use(
  session({
    secret: "secretsecretsecretsecret",
    resave: false,
    saveUninitialized: false,
    proxy: true,
  })
);

app.use(Express.json({ limit: "20mb" }));
app.use(Express.raw({ limit: "20mb" }));

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  return next();
});

app.use("/api/v1", apiRouter);

export { app };
