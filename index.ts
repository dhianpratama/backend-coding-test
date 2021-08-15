'use strict';

import * as sqlite3 from 'sqlite3';
import App from './src/app';
import buildSchemas from './src/schemas';
import logger from './src/logger';


const port = 8010;

const Sqlite3 = sqlite3.verbose();
const db = new Sqlite3.Database(':memory:');

db.serialize(() => {
    buildSchemas(db);

    const app = App(db);

    app.listen(port, () => logger.info(`App started and listening on port ${port}`));
});
