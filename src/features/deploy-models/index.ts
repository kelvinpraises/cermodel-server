import { Request, Response } from "express";
import { errors, results } from "../../utils/enums";
import responseHandler from "../../utils/response-handler";
import deployModels from "./application/core";

export default async (req: Request, res: Response) => {
  const { didSeed, ceramicNode, modelDetails } =
    req.body as IDeployModelRequest;

  const result = await deployModels({
    didSeed,
    ceramicNode,
    modelDetails,
  });

  switch (result.state) {
    case results.success:
      responseHandler({ res, status: 200, data: result.data });
      break;

    case results.failed:
      responseHandler({ res, status: 400, data: errors.generic });
      break;

    default:
      responseHandler({ res, status: 400, data: errors.generic });
      break;
  }
};
