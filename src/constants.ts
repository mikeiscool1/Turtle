import { KeywordType, OperatorType } from './enums';

export const keywords = {
  if: KeywordType.IF,
  else: KeywordType.ELSE,
  elif: KeywordType.ELIF,
  exit: KeywordType.EXIT,
  end: KeywordType.END,
  return: KeywordType.RETURN,
  while: KeywordType.WHILE,
  break: KeywordType.BREAK,
  continue: KeywordType.CONTINUE
};

export const operators = {
  and: OperatorType.AND,
  or: OperatorType.OR,
  xor: OperatorType.XOR,
  not: OperatorType.NOT,
  '&': OperatorType.B_AND,
  '|': OperatorType.B_OR,
  '^': OperatorType.B_XOR,
  '~': OperatorType.B_NOT,
  '<<': OperatorType.B_LSHIFT,
  '>>': OperatorType.B_RSHIFT,
  '=': OperatorType.ASSIGN,
  '==': OperatorType.EQUALS,
  '!=': OperatorType.NOT_EQUALS,
  '+': OperatorType.ADD,
  '-': OperatorType.SUB,
  '*': OperatorType.MUL,
  '/': OperatorType.DIV,
  '**': OperatorType.POWER,
  '%': OperatorType.MOD,
  '>': OperatorType.GREATER_THAN,
  '<': OperatorType.LESS_THAN,
  '>=': OperatorType.GREATER_THAN_EQUAL,
  '<=': OperatorType.LESS_THAN_EQUAL,
  '->': OperatorType.INDEX,
  in: OperatorType.IN,
  '.': OperatorType.DOT
};

export const allowedVariableNameChars = 'abcdefghijklmnopqrstuvwyxzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789';
export const operatorWords = [OperatorType.AND, OperatorType.OR, OperatorType.XOR, OperatorType.NOT, OperatorType.IN];
export const valueWords = {
  true: true,
  false: false,
  void: null,
  NaN: NaN,
  infinity: Infinity
};
export const unaryOperators = [OperatorType.B_NOT, OperatorType.NOT, OperatorType.MINUS];

// able to be used within code
export const usableConstants = {
  PI: Math.PI,
  E: Math.E
};
