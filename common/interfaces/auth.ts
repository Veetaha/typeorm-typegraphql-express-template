import * as Vts from 'vee-type-safe';

export const CredentialsTD = Vts.td({
    password: Vts.isStringOfLength({ min: 4, max: 37  }),
    email:    Vts.isStringOfLength({ min: 3, max: 256 }),
});
export type Credentials = Vts.TypeDescriptionTarget<typeof CredentialsTD>;