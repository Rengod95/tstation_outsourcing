/* tslint:disable */
/* eslint-disable */
/**
 * 
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface TireSizesInner
 */
export interface TireSizesInner {
    /**
     * 
     * @type {number}
     * @memberof TireSizesInner
     */
    readonly id?: number;
    /**
     * 
     * @type {string}
     * @memberof TireSizesInner
     */
    tireSize: string;
    /**
     * 
     * @type {number}
     * @memberof TireSizesInner
     */
    price: number;
    /**
     * 
     * @type {Date}
     * @memberof TireSizesInner
     */
    readonly created?: Date;
    /**
     * 
     * @type {Date}
     * @memberof TireSizesInner
     */
    readonly modified?: Date;
}

/**
 * Check if a given object implements the TireSizesInner interface.
 */
export function instanceOfTireSizesInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "tireSize" in value;
    isInstance = isInstance && "price" in value;

    return isInstance;
}

export function TireSizesInnerFromJSON(json: any): TireSizesInner {
    return TireSizesInnerFromJSONTyped(json, false);
}

export function TireSizesInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): TireSizesInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'tireSize': json['tire_size'],
        'price': json['price'],
        'created': !exists(json, 'created') ? undefined : (new Date(json['created'])),
        'modified': !exists(json, 'modified') ? undefined : (new Date(json['modified'])),
    };
}

export function TireSizesInnerToJSON(value?: TireSizesInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'tire_size': value.tireSize,
        'price': value.price,
    };
}

