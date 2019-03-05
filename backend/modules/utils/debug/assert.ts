import * as Vts from 'vee-type-safe';
import { shutdown } from "./shutdown";

/**
 * Checks that `Boolean(truthy) === true`, otherwise shutdowns and logs `truthy`.
 * 
 * @param truthy Suspect to be check for truthiness.
 */
export function assert(truthy: unknown) {
    if (!truthy) {
        shutdown(truthy, `assertion failure`);
    }
}

/**
 * Checks that `Boolean(truthy) === false`, otherwise shutdowns and logs `falsy`.
 * 
 * @param falsy Suspect to be check for truthiness.
 */
assert.falsy = (falsy: unknown) => {
    if (falsy) {
        shutdown(falsy, `assertion failure`);
    }
};


/**
 * Checks that `Vts.mismatch(suspect, typeDescr) === null`, otherwise shutdowns
 * and logs returned `MismatchInfo` object.
 * 
 * @param suspect   Value of to be checked for type conformance.
 * @param typeDescr `Vts.TypeDesciption` that `suspect` will be checked to match to.
 */
assert.matches = (suspect: unknown, typeDescr: Vts.TypeDescription) => {
    const mismatch = Vts.mismatch(suspect, typeDescr);
    if (mismatch) {
        shutdown(mismatch, 'type mismatch assertion failure');
    }
};