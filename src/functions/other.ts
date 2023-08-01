import { Expression } from '../types';

export function type(value: Expression) {
  const type = typeof value;
  if (type !== 'object') return type;

  if (Array.isArray(value)) return 'array';
  if (value === null) return 'void';
}
