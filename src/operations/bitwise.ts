import { Expression } from '../types';

export function b_and(l: Expression, r: Expression) {
  if (typeof l !== 'number') throw new Error('Left hand side of `&` operator is not a number.');
  if (typeof r !== 'number') throw new Error('Right hand side of `&` operator is not a number.');

  return l & r;
}

export function b_or(l: Expression, r: Expression) {
  if (typeof l !== 'number') throw new Error('Left hand side of `|` operator is not a number.');
  if (typeof r !== 'number') throw new Error('Right hand side of `|` operator is not a number.');

  return l | r;
}

export function b_xor(l: Expression, r: Expression) {
  if (typeof l !== 'number') throw new Error('Left hand side of `^` operator is not a number.');
  if (typeof r !== 'number') throw new Error('Right hand side of `^` operator is not a number.');

  return l ^ r;
}

export function b_not(r: Expression) {
  if (typeof r !== 'number') throw new Error('RIght hand side of `~` operator is not a number.');

  return ~r;
}

export function b_lshift(l: Expression, r: Expression) {
  if (typeof l !== 'number') throw new Error('Left hand side of `<<` operator is not a number.');
  if (typeof r !== 'number') throw new Error('Right hand side of `<<` operator is not a number.');

  return l << r;
}

export function b_rshift(l: Expression, r: Expression) {
  if (typeof l !== 'number') throw new Error('Left hand side of `>>` operator is not a number.');
  if (typeof r !== 'number') throw new Error('Right hand side of `>>` operator is not a number.');

  return l >> r;
}
