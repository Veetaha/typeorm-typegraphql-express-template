import _           from 'lodash';
import * as Vts from 'vee-type-safe';
import QueryString from 'querystring';
import FormData    from 'form-data';
import fetch, { Response } from 'node-fetch';
import { Log } from '@utils/debug';

export type QueryParamsObj = Vts.BasicObject<
    | string   | number   | boolean  
    | string[] | number[] | boolean[] 
>;

export type FormDataObj = Vts.BasicObject;

export interface GetJsonOptions
<TTypeDescr extends Vts.TypeDescription>
{
    endpoint:      string;
    /**
     * An object with keys as query keys and values as query values.
     * Arrays are converted to comma delimited lists.
     */
    queryParams:   QueryParamsObj;
    jsonTypedescr: TTypeDescr;
}

/**
 * Executes GET request with the given `queryParams`.
 * 
 * @throws Error | Vts.TypeMismatchError if network error occurs or
 *         `Vts.duckMismatch(fetchedJson, opts.jsonTypedescr) != null`
 * 
 */
export async function getJson
<TTypeDescr extends Vts.TypeDescription>
({queryParams, endpoint, jsonTypedescr}: GetJsonOptions<TTypeDescr>) {
    const queryParamsString = QueryString.stringify(_.mapValues(
        queryParams, val => Array.isArray(val) ? val.join(',') : val
    ));
    return tryGetJsonFromResponse( 
        await fetch(`${endpoint}?${queryParamsString}`,{ method: 'get' }),
        endpoint,
        jsonTypedescr
    );
}

export interface PostFormDataAndGetJsonOptions
<TTypeDescr extends Vts.TypeDescription>
{
    formData:      FormDataObj;
    endpoint:      string;
    jsonTypedescr: TTypeDescr;
}

/**
 * Executes POST request with the given `formData` (multipart/form-data).
 * 
 * 
 * @throws Error | Vts.TypeMismatchError if network error occurs or
 *         `Vts.duckMismatch(fetchedJson, opts.jsonTypedescr) != null`
 * 
 */
export async function postFormDataAndGetJson
<TTypeDescr extends Vts.TypeDescription>
({formData, endpoint, jsonTypedescr}: PostFormDataAndGetJsonOptions<TTypeDescr>) {
    const body = new FormData;

    _.forOwn(formData, (value, key) => void body.append(key, value));
    
    return tryGetJsonFromResponse(
        await fetch(endpoint, { method: 'post', body }),
        endpoint,
        jsonTypedescr
    );
}

async function tryGetJsonFromResponse
<TTypeDescr extends Vts.TypeDescription>
(
    response: Response, 
    endpoint: string, 
    typeDescr: TTypeDescr
): Promise<Vts.TypeDescriptionTarget<TTypeDescr>> {

    if (!response.ok) {
        Log.info(response);
        throw new Error(`${endpoint} responded with '${response.statusText}'`);
    }

    const jsonResponse = await response.json();
    Vts.ensureDuckMatch(jsonResponse, typeDescr);
    return jsonResponse;
}

