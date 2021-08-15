"use strict";

import App from "./app";
import { init } from "./models";
import logger from "./utils/logger";
import config from "./config";

(async () => {
  const db = await init();
  const app = App();
  app.listen(config.port, () => logger.info(`App started and listening on port ${config.port}`));
})();
