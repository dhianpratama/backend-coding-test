"use strict";

import App from "./src/app";
import buildSchemas from "./src/schemas";
import logger from "./src/logger";
import { openConnection } from "./src/utils/sqliteAsync";

const port = 8010;

(async () => {
  const db = await openConnection();
  buildSchemas(db);

  const app = App(db);

  app.listen(port, () => logger.info(`App started and listening on port ${port}`));
})();
