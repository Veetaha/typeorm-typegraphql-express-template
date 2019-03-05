const { Log } = require('../build/backend/modules/utils/debug');

void require('../build/backend/graphql/apollo-server.js');
Log.info('Schema was genereated');
