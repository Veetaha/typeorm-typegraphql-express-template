import * as I from '@modules/interfaces';
import { 
    Resolver,
    Arg,
    Mutation
} from 'type-graphql';
import { User          } from '@entities/user';
import { LoginRequest  } from '@graphql/types/login-request';
import { LoginResponse } from '@graphql/types/login-response';
import { nullable      } from '@utils/flags';


@Resolver()
export class AuthResolver {
   
    @Mutation(_type => LoginResponse, {nullable})
    async login(@Arg('req') credentials: LoginRequest): Promise<I.Maybe<LoginResponse>> {

        const user = await User.findByCredentials(credentials);

        return user == null ? null : { jwt: user.makeJwt(), user };
    }
    
}

