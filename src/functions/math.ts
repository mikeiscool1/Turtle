import { Expression } from '../types';

// logarithms and exponents

export function sqrt(number: Expression) {
  if (typeof number !== 'number') throw new Error('Argument `number` for `sqrt` must be a number.');

  return Math.sqrt(number);
}

export function log(number: Expression, base: Expression = 10) {
  if (typeof number !== 'number') throw new Error('Argument `number` for `log` must be a number.');
  if (typeof base !== 'number') throw new Error('Argument `base` for `log` must a number.');

  return Math.log(number) / Math.log(base);
}

export function ln(number: Expression) {
  if (typeof number !== 'number') throw new Error('Argument `number` for `ln` must be a number.');

  return Math.log(number);
}

// trigonometry

export function toDegree(number: Expression) {
  if (typeof number !== 'number') throw new Error('Argument `number` for `toDegree` must be a number.');

  return number * (180 / Math.PI);
}

export function toRadians(angle: Expression) {
  if (typeof angle !== 'number') throw new Error('Argument `angle` for `toDegree` must be a number.');

  return angle * (Math.PI / 180);
}

export function sin(number: Expression, asDegree: Expression = false) {
  if (typeof number !== 'number') throw new Error('Argument `number` for `sin` must be a number.');
  if (typeof asDegree !== 'boolean') throw new Error('Argument `asDegree` for `sin` must be a boolean.');

  if (asDegree) number = toRadians(number);

  // due to the inaccuracy of JavaScript's handling of numbers, we manually check for perfect zeros
  const edge = number / Math.PI;
  if (Number.isInteger(edge)) return 0;

  return Math.sin(number);
}

export function cos(number: Expression, asDegree: Expression = false) {
  if (typeof number !== 'number') throw new Error('Argument `number` for `cos` must be a number.');
  if (typeof asDegree !== 'boolean') throw new Error('Argument `asDegree` for `cos` must be a boolean.');

  if (asDegree) number = toRadians(number);

  const edge = number / Math.PI;
  if (Number.isInteger(edge)) return 0;

  return Math.cos(number);
}

export function tan(number: Expression, asDegree: Expression = false) {
  if (typeof number !== 'number') throw new Error('Argument `number` for `tan` must be a number.');
  if (typeof asDegree !== 'boolean') throw new Error('Argument `asDegree` for `tan` must be a boolean.');

  if (asDegree) number = toRadians(number);

  const edge = number / Math.PI;
  if (Number.isInteger(edge)) return 0;

  return Math.tan(number);
}

export function arcsin(number: Expression, asDegree: Expression = false) {
  if (typeof number !== 'number') throw new Error('Argument `number` for `arcsin` must be a number.');
  if (typeof asDegree !== 'boolean') throw new Error('Argument `asDegree` for `arcsin` must be a boolean.');

  if (asDegree) number = toRadians(number);

  const edge = number / Math.PI;
  if (Number.isInteger(edge)) return 0;

  return Math.asin(number);
}

export function arccos(number: Expression, asDegree: Expression = false) {
  if (typeof number !== 'number') throw new Error('Argument `number` for `arccos` must be a number.');
  if (typeof asDegree !== 'boolean') throw new Error('Argument `asDegree` for `arccos` must be a boolean.');

  if (asDegree) number = toRadians(number);

  const edge = number / Math.PI;
  if (Number.isInteger(edge)) return 0;

  return Math.acos(number);
}

export function arctan(number: Expression, asDegree: Expression = false) {
  if (typeof number !== 'number') throw new Error('Argument `number` for `arctan` must be a number.');
  if (typeof asDegree !== 'boolean') throw new Error('Argument `asDegree` for `arctan` must be a boolean.');

  if (asDegree) number = toRadians(number);

  const edge = number / Math.PI;
  if (Number.isInteger(edge)) return 0;

  return Math.atan(number);
}

// rounding

export function round(number: Expression) {
  if (typeof number !== 'number') throw new Error('Argument `number` for `round` must be a number.');

  return Math.round(number);
}

export function floor(number: Expression) {
  if (typeof number !== 'number') throw new Error('Argument `number` for `floor` must be a number.');

  return Math.floor(number);
}

export function ceil(number: Expression) {
  if (typeof number !== 'number') throw new Error('Argument `number` for `ceil` must be a number.');

  return Math.ceil(number);
}

export function truncate(number: Expression) {
  if (typeof number !== 'number') throw new Error('Argument `number` for `truncate` must be a number.');

  return Math.trunc(number);
}

// random

export function random() {
  return Math.random();
}

// abs

export function abs(number: Expression) {
  if (typeof number !== 'number') throw new Error('Argument `number` for `abs` must be a number.');

  return Math.abs(number);
}

// statistics

export function factorial(number: Expression) {
  if (typeof number !== 'number') throw new Error('Argument `number` for `factorial` must be a number.');

  for (let i = number - 1; i > 0; i--) number *= i;

  return number;
}

export function mean(numbers: Expression) {
  if (!Array.isArray(numbers)) throw new Error('Argument `numbers` for `mean` must be an array of numbers.');

  const sum = numbers.reduce((acc: number, curr) => {
    if (typeof curr !== 'number') throw new Error('Array includes non-number.');
    return acc + curr;
  }, 0);

  return sum / numbers.length;
}

export function median(numbers: Expression) {
  if (!Array.isArray(numbers)) throw new Error('Argument `numbers` for `median` must be an array of numbers.');
  if (numbers.length === 0) return null;

  numbers = numbers.sort((a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') throw new Error('Array includes non-number.');

    return a - b;
  });

  if (numbers.length % 2 === 1) return numbers[Math.floor(numbers.length / 2)];
  else return ((numbers as number[])[numbers.length / 2 - 1] + (numbers as number[])[numbers.length / 2]!) / 2;
}

export function mode(numbers: Expression) {
  if (!Array.isArray(numbers)) throw new Error('Argument `numbers` for `mode` must be an array of numbers.');
  if (numbers.length === 0) return null;

  const counter = new Map<number, number>();
  let best = numbers[0];

  for (const n of numbers) {
    if (typeof n !== 'number') throw new Error('Array includes non-number.');

    const value = counter.get(n);
    if (value) counter.set(n, value + 1);
    else counter.set(n, 1);

    if (value === best) best = n;
  }

  return best;
}

export function combinations(n: Expression, r: Expression) {
  if (typeof n !== 'number') throw new Error('Argument `n` for `combinations` must be a number.');
  if (typeof r !== 'number') throw new Error('Argument `r` for `combinations` must be a number.');

  return factorial(n) / (factorial(r) * factorial(n - r));
}

export function permutations(n: Expression, r: Expression) {
  if (typeof n !== 'number') throw new Error('Argument `n` for `permutations` must be a number.');
  if (typeof r !== 'number') throw new Error('Argument `r` for `permutations` must be a number.');

  return factorial(n) / factorial(n - r);
}

export function max(numbers: Expression) {
  if (!Array.isArray(numbers)) throw new Error('Argument `numbers` for `max` must be an array of numbers.');
  if (numbers.length === 0) return null;

  let max = -Infinity;
  for (const n of numbers) {
    if (typeof n !== 'number') throw new Error('Array includes non-number.');
    if (n > max) max = n;
  }

  return max;
}

export function min(numbers: Expression) {
  if (!Array.isArray(numbers)) throw new Error('Argument `numbers` for `min` must be an array of numbers.');
  if (numbers.length === 0) return null;

  let min = Infinity;
  for (const n of numbers) {
    if (typeof n !== 'number') throw new Error('Array includes non-number.');
    if (n < min) min = n;
  }

  return min;
}

export function gcd(a: Expression, b: Expression) {
  if (typeof a !== 'number') throw new Error('Argument `a` for `gcd` must be a number.');
  if (typeof b !== 'number') throw new Error('Argument `b` for `gcd` must be a number.');
  let divisor = 1;

  for (let i = 2; i <= a && i <= b; i++)
    if (a % i === 0 && b % i === 0)
      divisor = i;

  return divisor;
}

export function isNaN(number: Expression) {
  return Number.isNaN(number);
}