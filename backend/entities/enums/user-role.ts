import { registerEnumType } from "type-graphql";

export enum UserRole {
    Admin    = 'admin',
    Guest    = 'guest',
    Regular  = 'regular'
}

registerEnumType(UserRole, {
    name:        'UserRole',
    description: 'Identifies user access level'
});