import { Expression } from '../types';

export function add(l: Expression, r: Expression) {
  if (typeof l !== 'string' && typeof l !== 'number')
    throw new Error('Left hand side of `+` operator is not a number or string.');
  if (typeof r !== 'string' && typeof r !== 'number')
    throw new Error('Right hand side of `+` operator is not a number or string.');

  // @ts-ignore
  return l + r;
}

export function sub(l: Expression, r: Expression) {
  if (typeof l !== 'number') throw new Error('Left hand side of `-` operator is not a number.');
  if (typeof r !== 'number') throw new Error('Right hand side of `-` operator is not a number.');

  return l - r;
}

export function minus(r: Expression) {
  if (typeof r !== 'number') throw new Error('Right hand side of `-` operator is not a number.');

  return -r;
}

export function mul(l: Expression, r: Expression) {
  if (typeof l !== 'number') throw new Error('Left hand side of `*` operator is not a number.');
  if (typeof r !== 'number') throw new Error('Right hand side of `*` operator is not a number.');

  return l * r;
}

export function div(l: Expression, r: Expression) {
  if (typeof l !== 'number') throw new Error('Left hand side of `/` operator is not a number.');
  if (typeof r !== 'number') throw new Error('Right hand side of `/` operator is not a number.');

  if (r === 0) throw new Error('Cannot divide by zero.');

  return l / r;
}

export function power(l: Expression, r: Expression) {
  if (typeof l !== 'number') throw new Error('Left hand side of `**` operator is not a number.');
  if (typeof r !== 'number') throw new Error('Right hand side of `**` operator is not a number.');

  return l ** r;
}

export function mod(l: Expression, r: Expression) {
  if (typeof l !== 'number') throw new Error('Left hand side of `%` operator is not a number.');
  if (typeof r !== 'number') throw new Error('Right hand side of `%` operator is not a number.');

  return l % r;
}

export function greaterThan(l: Expression, r: Expression) {
  if (typeof l !== 'number') throw new Error('Left hand side of `>` operator is not a number.');
  if (typeof r !== 'number') throw new Error('Right hand side of `>` operator is not a number.');

  return l > r;
}

export function greaterThanEqual(l: Expression, r: Expression) {
  if (typeof l !== 'number') throw new Error('Left hand side of `>=` operator is not a number.');
  if (typeof r !== 'number') throw new Error('Right hand side of `>=` operator is not a number.');

  return l >= r;
}

export function lessThan(l: Expression, r: Expression) {
  if (typeof l !== 'number') throw new Error('Left hand side of `<` operator is not a number.');
  if (typeof r !== 'number') throw new Error('Right hand side of `<` operator is not a number.');

  return l < r;
}

export function lessThanEqual(l: Expression, r: Expression) {
  if (typeof l !== 'number') throw new Error('Left hand side of `<=` operator is not a number.');
  if (typeof r !== 'number') throw new Error('Right hand side of `<=` operator is not a number.');

  return l <= r;
}
