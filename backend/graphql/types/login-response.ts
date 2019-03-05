import { Field, ObjectType } from 'type-graphql';

import { User } from '@entities/user';


@ObjectType()
export class LoginResponse {
    @Field()
    jwt!: string;

    @Field()
    user!: User;
}