import express from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./.build/swagger.json";

import { RegisterRoutes } from "./.build/routes";

export const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Swagger UI
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 自動生成された関数にexpress appを引数に渡して実行する
RegisterRoutes(app);
