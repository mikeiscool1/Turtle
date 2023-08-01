import * as stream from './stream';
import * as math from './math';
import * as array from './array';
import * as string from './string';
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
  min
} = math;
export const { push, slice, splice, pop, shift, join, length, indexOf, lastIndexOf, sort } = array;
export const { substr, number, split } = string;
export const { type } = other;
