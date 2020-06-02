import { pipe } from 'lodash/fp';

const obj = { tag: 'JAVASCRIPT' };

let getObjValue = (obj) => obj.tag;
let addParenths = (value) => `(${value})`;
let lowerCase = (str) => str.toLowerCase();

const result = pipe(getObjValue, lowerCase, addParenths);

console.log(result(obj));

