import { Log } from '@utils/debug';

/**
 * Aborts current program execution workflow after invoking `error(payload, description)`.
 * 
 * @param payload       `Error` or vanilla object, which state needs to be logged.
 * @param description   Additional info message to be logged before `payload`.
 */
export function shutdown(payload: unknown = 'undefined behaviour', description = ''): never {
    Log.error(payload, description);
    return process.exit(1);
}
