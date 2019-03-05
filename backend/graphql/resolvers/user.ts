import { Resolver, Query, Arg, Int } from 'type-graphql';
import { User } from '@entities/user';

@Resolver()
export class UserResolver {// implements ResolverInterface<UserData> {

    @Query(_returns => User)
    async getUser(@Arg('id', _type => Int) id: number) {
        return User.findOneOrFail(id);
    }
       
}

