/* Utilities */


'use strict';

/* Config Encode Constant */
const ENCODE = require('../../config/general').ENCODE_CONSTANT;



/**
 * decode
 * @param {String} str
 * @returns {String}
 * @description Decodes an ecoded string 
 */
function decode(str) {
    let decoded = '';
    const strSplitted = str.split(/-/);
    
    for (let i = 0, l = strSplitted.length; i < l; i++) {
        const d = strSplitted[i].charCodeAt(0) - (ENCODE + i);
        decoded += `${String.fromCharCode(d)}`;
    }
    
    return decoded;
}


/**
 * encode
 * @param {String} str
 * @returns {String}
 * @description Encodes a string 
 */
function encode(str) {
    str = String(str);
    let encoded = '';
    
    for (let i = 0, l = str.length; i < l; i++) {
        const c = str[i].charCodeAt(0) + ENCODE + i;
        encoded += `${String.fromCharCode(c)}`;
        if (i < str.length-1) {
            encoded += '-';
        }
    }
    
    return encoded;
}


/**
 * findObjectByKey 
 * @param {Array} array
 * @param {String} key
 * @param {*} value
 * @returns {Array | null}
 * @description Looks for the key in the array and returns an array with the objects that contain the key with that value
 */
function findObjectByKey(array, key, value) {
    let objects = [];

    for (let i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            objects.push(array[i]);
        }
    }

    return (objects.length > 0) ? objects : null;
}


/**
 * isNullOrEmpty
 * @param {String, Arryay, Number} value
 * @returns {Boolean}
 * @description Returns true if is not null, undefined, or empty
 */
function isNullOrEmpty(value) {
    let is_null = true;

    if (value == undefined || value == null) return is_null;

    switch (value.constructor) {
        case String:
            is_null = value == '';
            break;

        case Number:
            is_null = value == '';
            break;

        case Object:
            is_null = Object.entries(value).length === 0;
            break;

        case Array:
            is_null = value.length === 0;
            break;
    }

    return is_null;
}


/**
 * searchInArray
 * @param {*} element 
 * @param {Array} array
 * @returns {Boolean}
 * @description Search an element in array and returns true if it is founded.
 */
function searchInArray(element, array) {
    return array.find(e => {
        return e === element
    }) != undefined;
}


module.exports = {
    isNullOrEmpty,
    searchInArray,
    findObjectByKey,
    decode,
    encode
}

