import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import deployModels from "./features/deploy-models/index.js";
import { handleError } from "./utils/middleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: true }));

app.use((req, res, next) => {
  handleError(express.json(), req, res, next);
});

app.get("/", (_, res) => {
  res.sendStatus(400);
});

/// Deploys the models to requested ceramic node.
/// Returns the aliases to the ceramic model.
app.get("/deploy-models", async (req, res) => {
  await deployModels(req, res);
});

/// Returns relevant server stats and logs.
app.get("/server-stats", (_, res) => {
  res.sendStatus(400);
});

app.listen(port, () => {
  console.log(`🔥 [server]: Server is running at https://localhost:${port}`);
});
