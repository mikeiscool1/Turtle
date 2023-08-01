import { Expression } from '../types';

export function and(l: Expression, r: Expression) {
  if (typeof l !== 'boolean') throw new Error('Left hand of `and` keyword is not a boolean.');
  if (typeof r !== 'boolean') throw new Error('Right hand of `and` keyword is not a boolean.');

  return l && r;
}

export function or(l: Expression, r: Expression) {
  if (typeof l !== 'boolean') throw new Error('Left hand of `or` keyword is not a boolean.');
  if (typeof r !== 'boolean') throw new Error('Right hand of `or` keyword is not a boolean.');

  return l || r;
}

export function not(r: Expression) {
  if (typeof r !== 'boolean') throw new Error('Right hand of `not` keyword is not a boolean.');

  return !r;
}

export function xor(l: Expression, r: Expression) {
  if (typeof l !== 'boolean') throw new Error('Left hand of `xor` keyword is not a boolean.');
  if (typeof r !== 'boolean') throw new Error('Right hand of `xor` keyword is not a boolean.');

  return l != r;
}

export function equals(l: Expression, r: Expression) {
  return l === r;
}

export function notEquals(l: Expression, r: Expression) {
  return l !== r;
}
