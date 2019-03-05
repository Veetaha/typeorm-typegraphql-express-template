import * as I from '@modules/interfaces';
import { Field, InputType } from 'type-graphql';
import { VeeMatch } from '@modules/decorators/vee-match';


@InputType()
export class LoginRequest implements I.Auth.Credentials {

    @Field()
    @VeeMatch(I.Auth.CredentialsTD.email)
    email!: string;

    @Field()
    @VeeMatch(I.Auth.CredentialsTD.password)
    password!: string;
    
}