import * as Vts   from 'vee-type-safe';
import * as Verify from 'class-validator';

class VeeMatchConstraint implements Verify.ValidatorConstraintInterface {
    validate(suspect: unknown, validationArgs?: Verify.ValidationArguments) {
        return validationArgs == null 
            ? false 
            : Vts.exactlyConforms(suspect, validationArgs.constraints[0]);
    }
}

export function VeeMatch
<TTypeDescr extends Vts.TypeDescription>
(typeDescr: TTypeDescr, options?: Verify.ValidationOptions) {
    return (classPrototype: Vts.BasicObject, propertyName: string) => {
        Verify.registerDecorator({
            name:        "VeeChecked",
            target:      classPrototype.constructor,
            constraints: [typeDescr],
            validator:   VeeMatchConstraint,
            propertyName,
            options
        });
    };
}