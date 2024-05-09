import cors from "cors";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// app routes
app.use("/api/v1", router);

const getAController = (req: Request, res: Response) => {
  res.send(
    `<div style="background: black; border-radius: 15px; width: 700px; height: 200px; margin: auto; margin-top: 50px; display: flex; flex-direction: column; justify-content: center; align-items: cenrer;"><h1 style="color: white; text-align: center;">Welcome To The Server Of PH University!</h1></div>`,
  );
};

app.get("/", getAController);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
