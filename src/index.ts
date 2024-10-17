import e from "express";
import cors from "cors";
import { createRoutes } from "./helpers/router.helper";

const PORT = process.env.PORT || 3000;

const app = e();

app.use(
  cors({
    origin: ["localhost", "*"],
    credentials: true,
  })
);
app.use(e.json());

Object.keys(process.env).forEach((key) => {
  if (key.startsWith("MONGO_URI_")) {
    const dbName = key.replace("MONGO_URI_", "").toLowerCase(); // Extrai o nome do banco
    const uri = process.env[key] as string;
    createRoutes(dbName, uri);
  }
});

app.listen(PORT, () => {
  console.log("cms running on:", PORT);
});

export default app;
