import Passport  from 'passport';
import Express   from 'express';
import * as Vts    from 'vee-type-safe';
import * as I      from '@modules/interfaces';
import * as Config from '@app/config';
import { User           } from '@entities/user';
import { ForbiddenError } from '@utils/error/statused-error';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';


Passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey:    Config.JWT.KeyPair.public
    },
    async (jwtPayload: unknown, done) => {
        const mismatch = Vts.mismatch(jwtPayload, I.Jwt.PayloadTD);
        return mismatch != null 
            ? done(new ForbiddenError(`invalid jwt, ${mismatch.toErrorString()}`))
            : User
                .findOneOrFail((jwtPayload as I.Jwt.Payload).sub)
                .then(user => done(null, user))
                .catch(done);
    }
));

export async function authenticateJwt(req: Express.Request) {
    return req.headers.authorization == null 
        ? null 
        : new Promise<I.Maybe<User>>(
            (resolve, reject) => Passport.authenticate('jwt', { session: false },
                (err, user?: I.Maybe<User>) => err != null ? reject(err) : resolve(user)
            )(req)
        );
}
