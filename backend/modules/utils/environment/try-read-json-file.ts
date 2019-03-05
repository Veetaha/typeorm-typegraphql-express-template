import * as Vts from 'vee-type-safe';
import * as Fs from 'fs';

/**
 * Tries to read the contents of the file that resides at `filePath` and to parse
 * it as JSON, that must exactly conform to the given `jsonTypeDescr`.
 * 
 * @param filePath      A path to the target JSON file to read from.
 * @param jsonTypeDescr `Vts.TypeDescription` of the target JSON file.
 * 
 * @throws `Error` if failed to read file or parse JSON.
 *         `Vts.TypeMismatchError` if pared json value failed to match to the 
 *          given `jsonTypeDescr`.
 */
export function tryReadJsonFileSync
<TTypeDescr extends Vts.TypeDescription>
(filePath: string, jsonTypeDescr: TTypeDescr): Vts.TypeDescriptionTarget<TTypeDescr> {
    const json = JSON.parse(Fs.readFileSync(filePath, { encoding: 'utf8' }));
    Vts.ensureMatch(json, jsonTypeDescr);
    return json;
}