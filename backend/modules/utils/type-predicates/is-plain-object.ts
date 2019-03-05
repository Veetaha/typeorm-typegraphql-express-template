import * as Vts from 'vee-type-safe';

/**
 * Shorthand for `Vts.isBasicObject(suspect) && suspect.__proto__ === Object.prototype`.
 */
export function isPlainObject(suspect: unknown): suspect is Vts.BasicObject {
    return Vts.isBasicObject(suspect) && Object.getPrototypeOf(suspect) === Object.prototype;
}
