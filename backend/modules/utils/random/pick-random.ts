import { IntegerRange } from '@utils/math/integer-range';

/**
 * Returns a random item from the given array. 
 * If array.length is 0 or subarrayRange goes beyond array index limits, 
 * may return `undefined`.
 * @param arr           Array to get random item from.
 * @param subarrayRange IntegerRange which defines subarray indexes to pick
 *                      items from, if not specified, takes items from the whole 
 *                      array.
 */
export function pickRandom<T>
(arr: ReadonlyArray<T>, subarrayRange = new IntegerRange(0, arr.length)) {
    return arr[subarrayRange.random()];
}