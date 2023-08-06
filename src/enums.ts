export enum KeywordType {
  IF = 1, // if
  ELSE, // else
  ELIF, // elif
  EXIT, // exit
  END, // end
  RETURN, // return
  WHILE, // while
  BREAK, // break
  CONTINUE // continue
}

export enum OperatorType {
  AND = 1, // and
  OR, // or
  XOR, // xor
  NOT, // not
  B_AND, // &
  B_OR, // |
  B_XOR, // ^,
  B_NOT, // ~
  B_LSHIFT, // <<
  B_RSHIFT, // >>
  ASSIGN, // =
  EQUALS, // ==
  NOT_EQUALS, // !=
  ADD, // +
  SUB, // -
  MINUS, // Unary minus sign.
  MUL, // *
  DIV, // /
  POWER, // **
  MOD, // %,
  GREATER_THAN, // >
  LESS_THAN, // <
  GREATER_THAN_EQUAL, // >=
  LESS_THAN_EQUAL, // <=
  INDEX, // ->
  IN,
  OPEN_PAREN, // ( - not used for function calls or declarations. Same as closed.
  CLOSED_PAREN, // )
  DOT, // .
}

export enum BlockType {
  IF,
  WHILE,
  FUNCTION
}
