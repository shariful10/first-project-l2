import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send(
    `<div style="background: blue; border-radius: 15px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); width: 500px; height: 200px; margin: auto; margin-top: 50px; display: flex; flex-direction: column; justify-content: center; align-items: cenrer;"><h1 style="color: white; text-align: center;">Welcome to the server 🥳</h1></div>`,
  );
});

export default app;
