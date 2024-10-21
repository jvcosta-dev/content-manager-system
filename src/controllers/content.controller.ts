import mongoose from "mongoose";
import { sendErrorResponse } from "../helpers/http";
import { IContentInput } from "../interfaces/content.interface";
import { Request, Response } from "express";

const isValidString = (value: string, minLength: number): boolean =>
  typeof value === "string" && value.length >= minLength;

const validateContentInput = (contentData: IContentInput) => {
  const errors: string[] = [];

  if (!isValidString(contentData.type, 3)) {
    errors.push["content data must be at leat 3 caracters long"];
  }

  if (!contentData.data || typeof contentData.data !== "object") {
    errors.push("Content 'data' must be a valid object");
  } else {
    Object.keys(contentData.data).forEach((key) => {
      const value = contentData.data[key];

      if (!isValidString(key, 1)) {
        errors.push(`Key '${key}' must be at least 1 character long`);
      }

      if (!isValidString(value, 1)) {
        errors.push(`Value for key '${key}' must be at least 1 character long`);
      }
    });
  }

  return errors;
};

const getContent = async (
  req: Request,
  res: Response,
  connection: mongoose.Connection
) => {
  try {
    const collection = connection.collection("content");
    const content = await collection.find().toArray();
    res.status(200).json(content);
  } catch (error) {
    sendErrorResponse(res, 500, "Server error");
    console.error(error);
  }
};

const insertContent = async (
  req: Request,
  res: Response,
  connection: mongoose.Connection
) => {
  const { type, data }: IContentInput = req.body;

  const errors = validateContentInput({ type, data });

  if (errors.length > 0) {
    sendErrorResponse(res, 400, "Invalid input");
    return;
  }

  try {
    const collection = connection.collection("content");
    await collection.insertOne({ type, data });
    res.sendStatus(201);
  } catch (error) {
    sendErrorResponse(res, 500, "Internal server error");
    console.error(error);
  }
};

const editContent = async (
  req: Request,
  res: Response,
  connection: mongoose.Connection
) => {
  const { contentId } = req.params;
  const { type, data }: IContentInput = req.body;

  const errors = validateContentInput({ type, data });

  if (errors.length > 0) {
    sendErrorResponse(res, 400, "Invalid input");
    return;
  }

  try {
    const collection = connection.collection("content");
    const content = await collection.findOneAndUpdate(
      { id: contentId },
      { type, data }
    );
    if (!content) {
      sendErrorResponse(res, 404, "Not found");
      return;
    }
    res.status(200).json(content);
  } catch (error) {
    sendErrorResponse(res, 500, "Internal server error");
    console.error(error);
  }
};

export { getContent, insertContent, editContent };
