import * as Utils  from '@utils/environment';
import * as Dotenv from 'dotenv';
import * as Path   from 'path';

Dotenv.load();

export const PasswordSalt = Utils.tryReadEnv('PASSWORD_SALT');
export const Port         = Utils.tryReadEnv('PORT');

export const GraphqlSchemaPath = pathFromRoot('common/schema.graphql');

export const Frontend = {
    DistDir:       pathFromRoot('dist'),
    IndexHtmlPath: pathFromRoot('dist/index.html')
};


export const JWT = {
    // expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
    ExpirationTime:    '7d',
    EncodingAlgorithm: 'RS256',
    KeyPair: Utils.tryReadJsonFileSync(
        pathFromRoot('.rsa-keypair.json'),
        { 
            private: 'string', 
            public:  'string' 
        }
    ),
};


function pathFromRoot(...pathParts: string[]) {
    return Path.normalize(Path.join(__dirname, '../../', ...pathParts));
}