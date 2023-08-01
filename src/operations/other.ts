import { isExpression, isFunctionCall } from '../typeguard';
import { Expression } from '../types';
import * as stdFunctions from '../functions/functions';
import { RunTime } from '../runtime';

export function index(l: Expression, r: Expression) {
  if (!Array.isArray(l) && typeof l !== 'string') throw new Error('Left hand side of `->` operator cannot be indexed.');
  if (typeof r !== 'number') throw new Error('Right hand side of `->` operator is not a number.');

  return l[r];
}

export function in_(l: Expression, r: Expression) {
  if (!Array.isArray(r)) throw new Error('Right hand side of `in` operator must be an array.');
  return r.includes(l);
}

export function dot(runtime: RunTime, l: Expression, r: Expression) {
  if (!isFunctionCall(r)) throw 'Right hand side of `.` opeartor must be a function.';

  const stdFn = stdFunctions[r.name as keyof typeof stdFunctions] as Function;
  if (stdFn) {
    for (let i = 0; i < r.args.length; i++) if (!isExpression(r.args[i])) r.args[i] = runtime.evaluate([r.args[i]]);

    return stdFn(l, ...r.args);
  }
}
