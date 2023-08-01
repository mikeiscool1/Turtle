import { Expression } from '../types';

export function substr(str: Expression, begin: Expression, end: Expression) {
  if (typeof str !== 'string') throw new Error('Argument `str` for `substr` must be an array.');
  if (typeof begin !== 'number') throw new Error('Argument `begin` for `substr` must be a number.');
  if (typeof end !== 'number') throw new Error('Argument `end` for `substr` must be a number.');

  return str.substring(begin, end);
}

export function number(str: Expression) {
  if (typeof str !== 'string') throw new Error('Argument `str` for `substr` must be an array.');
  return +str;
}

export function split(str: Expression, delimeter: Expression) {
  if (typeof str !== 'string') throw new Error('Argument `str` for `split` must be an array.');
  if (typeof delimeter !== 'string') throw new Error('Argument `str` for `delimeter` must be a string.');

  return str.split(delimeter);
}
