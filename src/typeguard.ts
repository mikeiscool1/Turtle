import { KeywordType } from './enums';
import {
  Expression,
  FunctionCallToken,
  FunctionDeclarationToken,
  KeywordToken,
  OperatorToken,
  GroupToken,
  Token,
  VariableToken
} from './types';

export function isKeyword(token: Token): token is KeywordToken {
  return !isExpression(token) && 'keyword' in token;
}

export function isOperator(token: Token): token is OperatorToken {
  return !isExpression(token) && 'operator' in token;
}

export function isGroup(token: Token): token is GroupToken {
  return !isExpression(token) && 'children' in token;
}

export function isFunctionCall(token: Token): token is FunctionCallToken {
  return !isExpression(token) && 'args' in token && !('line' in token);
}

export function isFunctionDeclaration(token: Token): token is FunctionDeclarationToken {
  return !isExpression(token) && 'args' in token && 'line' in token;
}

export function isVariable(token: Token): token is VariableToken {
  return !isExpression(token) && 'name' in token && !('line' in token);
}

export function isExpression(token: Token): token is Expression {
  return typeof token !== 'object' || token === null || Array.isArray(token);
}
