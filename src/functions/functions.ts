import * as stream from './stream';
import * as math from './math';
import * as array from './array';
import * as string from './string';
import * as regex1 from './regex';
import * as other from './other';

export const { print, prompt } = stream;
export const {
  sqrt,
  log,
  ln,
  toDegree,
  toRadians,
  sin,
  cos,
  tan,
  arcsin,
  arccos,
  arctan,
  round,
  floor,
  ceil,
  truncate,
  random,
  abs,
  factorial,
  mean,
  median,
  mode,
  combinations,
  permutations,
  max,
  min,
  gcd,
  isNaN
} = math;
export const { push, slice, splice, pop, shift, join, length, indexOf, lastIndexOf, sort } = array;
export const { substr, number, split } = string;
export const { regex, test, match } = regex1;
export const { type, error } = other;
