'use strict';

import * as sqlite3 from 'sqlite3';
import App from './src/app';
import buildSchemas from './src/schemas';

const port = 8010;

const Sqlite3 = sqlite3.verbose();
const db = new Sqlite3.Database(':memory:');

db.serialize(() => {
    buildSchemas(db);

    const app = App(db);

    app.listen(port, () => console.log(`App started and listening on port ${port}`));
});
