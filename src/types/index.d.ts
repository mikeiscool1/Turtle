import { KeywordType, FunctionType } from '../enums';
export type Types = string | boolean | number | null | Types[];

// the only difference between keyword and operator is that an operator does not require spaces

export type KeywordToken = {
  keyword: KeywordType;
};

export type OperatorToken = {
  operator: OperatorType;
};

export type GroupToken = {
  children: Token[];
};

export type FunctionCallToken = {
  name: string;
  args: Token[];
};

export type FunctionDeclarationToken = {
  name: string;
  args: string[];
  line: number;
};

export type VariableToken = {
  name: string;
};

export type Token =
  | Expression
  | KeywordToken
  | OperatorToken
  | SectionToken
  | FunctionCallToken
  | FunctionDeclarationToken
  | VariableToken;

export type Expression = Types;
