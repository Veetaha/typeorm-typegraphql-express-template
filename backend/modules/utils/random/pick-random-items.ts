import * as Vts    from 'vee-type-safe';
import * as MathJs from 'mathjs';
import { assert    } from '@utils/debug';
import { swapItems } from '@utils/array';

/**
 * Returns IterableIterator<T> which randomly picks each arr[i] value at most
 * times[i] times, thus creates the `_.sum(times)` iterations.
 * 
 * @copyright https://stackoverflow.com/a/196065/9259330
 * 
 * @param arr   Array to pick values from
 * @param times Array of numbers of times a value can be picked from `arr`
 * 
 * @remarks 
 * Prerequisites: arr.length === times.length and each `times[i] >= 1`.
 * Beware that this function takes ownership of `arr` and `times` references.
 * `times` and `arr` array values get randomly shuffled, moreover 
 * `times[i]` gets decreased each time `arr[i]` value was picked.
 * Thus you should copy `arr` and `times` array if those changes are unacceptable, 
 * e.g. `pickRandomItems([...arr], [...times])`
 * 
 */
export function * pickRandomItems<T>(arr: T[], times: number[]) {
    assert.matches(times, [Vts.isPositiveInteger]);
    let edgeIndex = 0;
    while (edgeIndex < arr.length) {
        const randomIndex = MathJs.randomInt(edgeIndex, arr.length);
        const randomValue = arr[randomIndex];
        if (!--times[randomIndex]) {
            swapItems(arr,   randomIndex, edgeIndex);
            swapItems(times, randomIndex, edgeIndex);
            ++edgeIndex;
        }
        yield randomValue;
    }
}