import { Expression } from '../types';

export function type(value: Expression) {
  const type = typeof value;
  if (type !== 'object') return type;

  if (Array.isArray(value)) return 'array';
  if (value === null) return 'void';
}

export function error(message: Expression = '') {
  if (typeof message !== 'string') throw new Error('Argument `message` for `error` must be a string or void.');
  throw new Error(message);
}