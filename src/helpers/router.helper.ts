import { connectMongo } from "./db.helper";
import app from "../index";
import {
  editContent,
  getContent,
  insertContent,
} from "../controllers/content.controller";
import { Request, Response } from "express";

export const createRoutes = async (dbName: string, uri: string) => {
  const connection = await connectMongo(uri, dbName);

  app.get(`/${dbName}`, (req: Request, res: Response) =>
    getContent(req, res, connection)
  );

  app.post(`/${dbName}`, (req: Request, res: Response) =>
    insertContent(req, res, connection)
  );

  app.patch(`/${dbName}/:contentId`, (req: Request, res: Response) =>
    editContent(req, res, connection)
  );

  console.log(`created routes for /${dbName}`);
};
