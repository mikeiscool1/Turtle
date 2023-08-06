import { Expression } from '../types';

export function and(l: Expression, r: Expression) {
  return l && r;
}

export function or(l: Expression, r: Expression) {
  return l || r;
}

export function not(r: Expression) {
  return !r;
}

export function xor(l: Expression, r: Expression) {
  return l != r;
}

export function equals(l: Expression, r: Expression) {
  return l === r;
}

export function notEquals(l: Expression, r: Expression) {
  return l !== r;
}
