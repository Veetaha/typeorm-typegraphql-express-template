import * as Vts  from 'vee-type-safe';
import * as Coll from 'typescript-collections';

/** Rate limit ensures a function is never called more than every [rate]ms
 *  Unlike lodash's _.throttle function, function calls are queued so that
 *   requests are never lost and simply deferred until some other time.
 *
 * @param func Async function to limit execution rate.
 * @param minDelay Minimum time to wait between function calls (miliseconds).
 *
 * @copyright https://gist.github.com/mattheworiordan/1084831 
 */
export function limitExecRate
<TFn extends Vts.AsyncRoutine<any[], any>, TThis = unknown>
(func: TFn, minDelay: number) {
    
    const queue   = new Coll.Queue<[
        (res: Vts.AsyncReturnType<TFn>) => void, 
        (err: unknown) => void,
        TThis, 
        Parameters<TFn>
    ]>();
    let isWaiting = false;
    
    return function wrapper(this: TThis, ...args: Parameters<TFn>) {
        return new Promise<Vts.AsyncReturnType<TFn>>((resolve, reject) => {
            if (isWaiting) {
                queue.enqueue([resolve, reject, this, args]);
                return;
            } 
            setTimeout(() => {
                isWaiting = false;
                if (!queue.isEmpty()) {
                    const [headResolve, headReject, headThis, headArgs] = queue.dequeue()!;
                    wrapper.apply(headThis, headArgs).then(headResolve, headReject);
                }
            }, minDelay);
            isWaiting = true;
            func.apply(this, args).then(resolve, reject);
        });
    };
}