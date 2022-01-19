import ormconfig from "./ormconfig";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { app } from "./api";

const port = process.env.PORT || 3000;

(async () => {
  await createConnection(ormconfig);

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
