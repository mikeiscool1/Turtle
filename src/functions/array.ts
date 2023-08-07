import { Expression } from '../types';

export function push(array: Expression, value: Expression) {
  if (!Array.isArray(array)) throw new Error('Argument `array` for `push` must be an array.');

  return array.push(value);
}

export function slice(array: Expression, begin: Expression, end: Expression = Infinity) {
  if (!Array.isArray(array)) throw new Error('Argument `array` for `slice` must be an array.');
  if (typeof begin !== 'number') throw new Error('Argument `begin` for `slice` must be a number.');
  if (typeof end !== 'number') throw new Error('Argument `end` for `slice` must be a number.');

  return array.slice(begin, end);
}

export function splice(array: Expression, begin: Expression, delCount: Expression = 0, replaceWith?: Expression) {
  if (!Array.isArray(array)) throw new Error('Argument `array` for `splice` must be an array.');
  if (typeof begin !== 'number') throw new Error('Argument `begin` for `slice` must be a number.');
  if (typeof delCount !== 'number') throw new Error('Argument `delCount` for `slice` must be a number.');

  if (replaceWith) return array.splice(begin, delCount, replaceWith);
  else return array.splice(begin, delCount);
}

export function pop(array: Expression) {
  if (!Array.isArray(array)) throw new Error('Argument `array` for `pop` must be an array.');

  return array.pop();
}

export function shift(array: Expression) {
  if (!Array.isArray(array)) throw new Error('Argument `array` for `shift` must be an array.');

  return array.shift();
}

export function join(array: Expression, delimiter: Expression) {
  if (!Array.isArray(array)) throw new Error('Argument `array` for `join` must be an array.');
  if (typeof delimiter !== 'string') throw new Error('Argument `delimiter` for `join` must be a string.');

  return array.join(delimiter);
}

// supports both strings and arrays.
export function length(arrayOrString: Expression) {
  if (typeof arrayOrString !== 'string' && !Array.isArray(arrayOrString))
    throw new Error('Argument `arrayOrString` for `length` must be an array or string.');

  return arrayOrString.length;
}

export function indexOf(arrayOrString: Expression, value: Expression) {
  if (typeof arrayOrString !== 'string' && !Array.isArray(arrayOrString))
    throw new Error('Argument `arrayOrString` for `indexOf` must be an array or string.');

  if (typeof arrayOrString === 'string' && typeof value !== 'string')
    throw new Error('Cannot search for a non-string in a string.');

  return (arrayOrString as any[]).indexOf(value);
}

export function lastIndexOf(arrayOrString: Expression, value: Expression) {
  if (typeof arrayOrString !== 'string' && !Array.isArray(arrayOrString))
    throw new Error('Argument `arrayOrString` for `lastIndexOf` must be an array or string.');

  if (typeof arrayOrString === 'string' && typeof value !== 'string')
    throw new Error('Cannot search for a non-string in a string.');

  return (arrayOrString as any[]).lastIndexOf(value);
}

export function sort(array: Expression, descending = false) {
  if (!Array.isArray(array)) throw new Error('Argument `array` for `sort` must be an array.');
  if (typeof descending !== 'number') throw new Error('Argument `descending` for `sort` must be a boolean.');

  return array.sort((a, b) => {
    if (typeof a !== 'number') throw new Error('Argument includes non-number.');
    if (typeof b !== 'number') throw new Error('Argument includes non-number.');

    return descending ? b - a : a - b;
  });
}
