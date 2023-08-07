import { Expression } from '../types';

export function substr(str: Expression, begin: Expression, end: Expression) {
  if (typeof str !== 'string') throw new Error('Argument `str` for `substr` must be a string.');
  if (typeof begin !== 'number') throw new Error('Argument `begin` for `substr` must be a number.');
  if (typeof end !== 'number') throw new Error('Argument `end` for `substr` must be a number.');

  return str.substring(begin, end);
}

export function number(str: Expression) {
  if (typeof str !== 'string') throw new Error('Argument `str` for `number` must be a string.');
  return +str;
}

export function split(str: Expression, delimiter: Expression) {
  if (typeof str !== 'string') throw new Error('Argument `str` for `split` must be a string.');
  if (typeof delimiter !== 'string') throw new Error('Argument `str` for `delimiter` must be a string.');

  return str.split(delimiter);
}
