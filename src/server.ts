"use strict";

import App from "./app";
import config from "./config";
import { init } from "./models";
import logger from "./utils/logger";

(async () => {
  const db = await init();
  const app = App();
  app.listen(config.port, () => logger.info(`App started and listening on port ${config.port}`));
})();
