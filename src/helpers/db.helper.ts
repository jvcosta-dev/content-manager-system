import mongoose from "mongoose";

const connections: { [key: string]: any } = {};

export const connectMongo = async (uri: string, dbName: string) => {
  if (!connections[dbName]) {
    connections[dbName] = mongoose.createConnection(uri, { dbName });
  }
  return connections[dbName];
};
