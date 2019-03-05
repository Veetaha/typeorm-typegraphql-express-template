import 'reflect-metadata'; // Polyfill required by Typegoose and TypeGraphQL
import Express      from 'express';
import Morgan       from 'morgan';
import apolloServer from '@graphql/apollo-server';
import * as HttpCodes from 'http-status-codes';
import * as Config    from '@app/config';
import { apiRouter } from '@routes/api';
import { Log       } from '@utils/debug';

const app = Express()
    .use(Morgan('dev'))
    .use(Express.static(Config.Frontend.DistDir));

apolloServer.applyMiddleware({ app, path: '/graphql'});

app .use('/api/v1', apiRouter)
    .get('*', (_req, res) => res.sendFile(Config.Frontend.IndexHtmlPath))

    .use(((err, _req, res, _next) => {
        Log.error(err, 'Global express error handler');
        return res
            .status(err.status || HttpCodes.INTERNAL_SERVER_ERROR)
            .json({ error: err });
    }) as Express.ErrorRequestHandler);
    
app.listen(
    Config.Port,
    () => Log.info(`🚀  Server is listening on port ${Config.Port}`)
);

// Close DB connection when terminating the program
// process.on('SIGINT', () => Mongoose.disconnect().finally(() => process.exit(0)));


