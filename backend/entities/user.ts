import * as Crypto from 'crypto';
import * as JWT    from 'jsonwebtoken';
import * as Api    from 'type-graphql';
import * as Orm    from 'typeorm';
import * as Config from '@app/config';
import * as I      from '@modules/interfaces';
import { VeeMatch } from '@modules/decorators/vee-match';
import { UserRole } from '@entities/enums/user-role';
export { UserRole };

import { unique } from '@utils/flags';

@Api.ObjectType()
export class User extends Orm.BaseEntity implements I.Auth.Credentials {
    
    @Api.Field(_type => Api.Int)
    @Orm.PrimaryGeneratedColumn()
    id!: number;

    // @Field()
    // @prop({ required, default: false })
    // disabled!: boolean;
    

    @Api.Field(_type => UserRole) // must be explicitly forwarded when using enums
    @Orm.Column({ enum: Object.values(UserRole), default: UserRole.Regular })
    role!: UserRole;

    @Orm.Column() 
    @VeeMatch(I.Auth.CredentialsTD.password)
    password!: string; // do not expose password as public GraphQL field

    @Api.Field()
    @Orm.Column({ unique }) 
    @VeeMatch(I.Auth.CredentialsTD.email)
    email!: string;

    @Api.Field()
    @Orm.CreateDateColumn()
    creationDate!: Date;

    @Api.Field()
    @Orm.UpdateDateColumn()
    lastUpdateDate!: Date;

    /**
     * Searches for `User` with the given `email` and `password`. Password is 
     * automatically encoded before being propagated to the mongoose.
     * 
     * @param email    Target user email.
     * @param password Raw target user password.
     * 
     */
    static async findByCredentials({ email, password }: I.Auth.Credentials ) {
        return User.findOne({
            email, 
            password: this.encodePassword(password)
        });
    }

    /**
     * Returns a hash-encoded representation of password to store in the database.
     * @param password Real password to be encoded.
     */
    public static encodePassword(password: string) {
        const hash = Crypto.createHmac('sha512', Config.PasswordSalt);
        hash.update(password);
        return hash.digest('hex');
    }

    /**
     * Returns JSON web token string for this user.
     */
    makeJwt() {
        const customPayload: I.Jwt.Payload = {
            sub: this.id
        };
        return JWT.sign(customPayload, Config.JWT.KeyPair.private, {
            expiresIn: Config.JWT.ExpirationTime,
            algorithm: Config.JWT.EncodingAlgorithm
        });
    }
}

export type UserData = I.ClassProperties<User>;