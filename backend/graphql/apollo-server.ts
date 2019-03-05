import * as Config from '@app/config';
import * as Apollo from 'apollo-server-express';
import { buildSchemaSync   } from "type-graphql";
import { makeContext       } from '@graphql/resolve-context';
import { authChecker       } from '@graphql/auth-checker';

export default new Apollo.ApolloServer({
    playground:    true,
    introspection: true,
    schema: buildSchemaSync({
        resolvers:      [`${__dirname}/resolvers/*.js`],
        emitSchemaFile: Config.GraphqlSchemaPath,
        authChecker
    }),
    context:     makeContext
});
