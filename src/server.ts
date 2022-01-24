import http from "http";
import express, { Express } from "express";
import morgan from "morgan";

import routes from "./routes";

const router: Express = express();

router.use(morgan("dev"));

router.use(express.json());

router.use("/", routes);

router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 5000;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
