import { OperatorType } from '../enums';
import * as arithmetic from './arithmetic';
import * as logic from './logic';
import * as bitwise from './bitwise';
import * as other from './other';

export function find(operator: OperatorType): Function {
  switch (operator) {
    // logic operators
    case OperatorType.AND:
      return logic.and;
    case OperatorType.OR:
      return logic.or;
    case OperatorType.XOR:
      return logic.xor;
    case OperatorType.NOT:
      return logic.not;

    // rest of the actual operators
    case OperatorType.B_AND:
      return bitwise.b_and;
    case OperatorType.B_OR:
      return bitwise.b_or;
    case OperatorType.B_XOR:
      return bitwise.b_xor;
    case OperatorType.B_NOT:
      return bitwise.b_not;
    case OperatorType.B_LSHIFT:
      return bitwise.b_lshift;
    case OperatorType.B_RSHIFT:
      return bitwise.b_rshift;
    case OperatorType.EQUALS:
      return logic.equals;
    case OperatorType.NOT_EQUALS:
      return logic.notEquals;
    case OperatorType.ADD:
      return arithmetic.add;
    case OperatorType.SUB:
      return arithmetic.sub;
    case OperatorType.MUL:
      return arithmetic.mul;
    case OperatorType.DIV:
      return arithmetic.div;
    case OperatorType.POWER:
      return arithmetic.power;
    case OperatorType.MOD:
      return arithmetic.mod;
    case OperatorType.GREATER_THAN:
      return arithmetic.greaterThan;
    case OperatorType.LESS_THAN:
      return arithmetic.lessThan;
    case OperatorType.GREATER_THAN_EQUAL:
      return arithmetic.greaterThanEqual;
    case OperatorType.LESS_THAN_EQUAL:
      return arithmetic.lessThanEqual;
    case OperatorType.INDEX:
      return other.index;
    case OperatorType.IN:
      return other.in_;
    case OperatorType.DOT:
      return other.dot;

    default:
      throw new Error('Unknown operator.');
  }
}

export function precedence(operator: OperatorType): number {
  switch (operator) {
    case OperatorType.POWER:
      return 8;
    case OperatorType.INDEX:
      return 8;

    case OperatorType.MUL:
      return 7;
    case OperatorType.DIV:
      return 7;
    case OperatorType.MOD:
      return 7;

    case OperatorType.ADD:
      return 6;
    case OperatorType.SUB:
      return 6;

    case OperatorType.B_AND:
      return 5;
    case OperatorType.B_OR:
      return 5;
    case OperatorType.B_XOR:
      return 5;
    case OperatorType.B_NOT:
      return 5;
    case OperatorType.B_LSHIFT:
      return 5;
    case OperatorType.B_RSHIFT:
      return 5;

    case OperatorType.GREATER_THAN:
      return 4;
    case OperatorType.GREATER_THAN_EQUAL:
      return 4;
    case OperatorType.LESS_THAN:
      return 4;
    case OperatorType.LESS_THAN_EQUAL:
      return 4;
    case OperatorType.EQUALS:
      return 4;
    case OperatorType.NOT_EQUALS:
      return 4;

    case OperatorType.IN:
      return 3;

    case OperatorType.NOT:
      return 2;

    case OperatorType.AND:
      return 1;
    case OperatorType.OR:
      return 1;
    case OperatorType.XOR:
      return 1;

    case OperatorType.OPEN_PAREN:
      return 0;
    case OperatorType.CLOSED_PAREN:
      return 0;

    default:
      throw new Error('Unknown operator.');
  }
}
