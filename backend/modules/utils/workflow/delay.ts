/**
 * Returns a Promise, that will be resolve in `msec` miliseconds.
 */
export function delay(msec: number) {
    return new Promise<void>(resolve => setInterval(resolve, msec));
}