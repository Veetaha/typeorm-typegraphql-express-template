import { Log } from '@utils/debug';

/**
 * Awaits `routine()` and prints its execution time to the console.
 */
export async function measurePerformance(routine: () => Promise<void>, functionName = routine.name) {
    Log.info(`invoking ${functionName}`);
    const before = Date.now();
    await routine();
    const after = Date.now();
    Log.info(`${functionName} was running ${after - before} ms`);
}

