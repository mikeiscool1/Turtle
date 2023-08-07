import { Expression } from '../types';

export function regex(regex: Expression, flags?: Expression) {
  if (typeof regex !== 'string') throw new Error('Argument `regex` for `regex` must be a string.');
  if (flags !== undefined && typeof flags !== 'string') throw new Error('Argument `flags` for `regex` must be a string or void.');

  return new RegExp(regex, flags);
}

export function test(regex: Expression, string: Expression) {
  if (!(regex instanceof RegExp)) throw new Error('Argument `regex` for `test` must be a regular expression.');
  if (typeof string !== 'string') throw new Error('Argument `string` for `test` must be a string or void.');

  return regex.test(string);
}

export function match(regex: Expression, string: Expression) {
  if (!(regex instanceof RegExp)) throw new Error('Argument `regex` for `match` must be a regular expression.');
  if (typeof string !== 'string') throw new Error('Argument `string` for `match` must be a string or void.');

  return string.match(regex)?.[0] ?? null;
}