import { AuthChecker    } from "type-graphql";
import { ResolveContext } from "@graphql/resolve-context";
import { UserRole       } from "@entities/user";

export const authChecker: AuthChecker<ResolveContext, UserRole> = ({context: {user}}, roles) => (
    user != null && roles.includes(user.role)
);