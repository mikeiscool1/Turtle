import { BlockType, KeywordType, OperatorType } from './enums';
import {
  isExpression,
  isFunctionCall,
  isFunctionDeclaration,
  isKeyword,
  isOperator,
  isGroup,
  isVariable
} from './typeguard';
import { Expression, FunctionDeclarationToken, KeywordToken, OperatorToken, Token, Types } from './types';

import * as stdFunctions from './functions/functions';
import * as operations from './operations/operations';
import { unaryOperators, usableConstants } from './constants';

export class RunTime {
  public variables = new Map<string, Expression>();
  public functions = new Map<string, FunctionDeclarationToken>();
  public script: Token[][];
  public line = 0;

  // the line of the script
  public code: Token[];

  /**
   * The current active loops. Used to jump to the beginning when the end of a loop is reached, or there is a break or continue.
   */
  public loops: number[] = [];
  /**
   * The current block you are in.
   */
  public currentBlock: BlockType[] = [];

  constructor(script: Token[][]) {
    this.script = script;
    this.code = script[0];
  }

  /**
   * Begin running the code
   */
  public run() {
    while (true) {
      const firstToken = this.code[0];

      if (isFunctionDeclaration(firstToken)) {
        // now we know where to find the function in the code.

        firstToken.line = this.line;
        this.functions.set(firstToken.name, firstToken);
        this.findEnd();
        this.next();
      }

      if (!isKeyword(firstToken)) {
        this.evaluate(this.code);
        this.next(true);

        continue;
      }

      if (firstToken.keyword === KeywordType.EXIT) return process.exit(0);

      if (firstToken.keyword === KeywordType.ELIF || firstToken.keyword === KeywordType.ELSE) {
        this.findEnd();
        continue;
      }

      if (firstToken.keyword === KeywordType.IF) {
        const condition = Boolean(this.evaluate(this.code.slice(1)));

        this.currentBlock.push(BlockType.IF);

        if (condition) {
          this.next();
          continue;
        } else {
          while (true) {
            this.findNextChain();
            const nextChainFirstToken = this.code[0] as KeywordToken;

            if (nextChainFirstToken.keyword === KeywordType.ELIF) {
              const condition = Boolean(this.evaluate(this.code.slice(1)));

              if (condition) {
                this.next();
                break;
              } else continue;
            } else if (nextChainFirstToken.keyword === KeywordType.ELSE) {
              this.next();
              break;
            } else {
              // end
              break;
            }
          }

          continue;
        }
      }

      if (firstToken.keyword === KeywordType.WHILE) {
        const condition = this.evaluate(this.code.slice(1));

        if (typeof condition !== 'boolean') throw new Error('While condition is not a boolean.');

        if (condition) {
          this.currentBlock.push(BlockType.WHILE);
          this.loops.push(this.line);

          this.next();
          continue;
        } else {
          this.findEnd();
          this.next();
          continue;
        }
      }

      if (firstToken.keyword === KeywordType.END) {
        const lastBlock = this.currentBlock.pop();

        if (lastBlock === BlockType.WHILE) {
          const loopBegin = this.loops.pop()!;

          this.jumpTo(loopBegin);
          continue;
        } else if (lastBlock === BlockType.FUNCTION) return null;

        this.next();
        continue;
      }

      if (firstToken.keyword === KeywordType.BREAK || firstToken.keyword === KeywordType.CONTINUE) {
        // removes the last while element and all elements after it.
        while (this.currentBlock.pop() !== BlockType.WHILE)
          if (this.currentBlock.at(-1) === undefined)
            throw new Error(
              `${firstToken.keyword === KeywordType.BREAK ? 'break' : 'continue'} used outside of a loop.`
            );

        this.jumpTo(this.loops.at(-1)!);
        this.loops.pop();

        if (firstToken.keyword === KeywordType.BREAK) this.findEnd();

        continue;
      }

      if (firstToken.keyword === KeywordType.RETURN) {
        while (this.currentBlock.pop() !== BlockType.FUNCTION) if (this.currentBlock.at(-1) === undefined) break;

        const lastExpression = this.evaluate(this.code.slice(1));
        return lastExpression;
      }

      throw new Error('Program did not successfully finish executing.');
    }
  }

  /**
   * Run a custom function
   */
  private runFunction(fn: FunctionDeclarationToken, args: Expression[]) {
    if (fn.args.length !== args.length)
      throw new Error(
        `The amount of arguments provided for the function ${fn.name} does not match the amount of arguments it takes.`
      );

    this.jumpTo(fn.line + 1);
    this.currentBlock.push(BlockType.FUNCTION);

    for (let i = 0; i < fn.args.length; i++) this.variables.set(fn.args[i], args[i]);

    return this.run();
  }

  /**
   * Evaluate everything besides operators
   */
  private evaluateNonOperators(tokens: Token[]): Token[] {
    const code = [...tokens];

    for (let i = 0; i < code.length; i++) {
      const token = code[i];

      if (Array.isArray(token)) {
        const args = [...token];
        for (let i = 0; i < token.length; i++)
          if (!isExpression(token[i]) || Array.isArray(token[i])) args[i] = this.evaluate([token[i]]);

        code[i] = args;
        continue;
      }

      if (isFunctionCall(token)) {
        const left = code[i - 1];
        if (isOperator(left) && left.operator === OperatorType.DOT) {
          let expr = code[i - 2];
          if (!expr) throw new Error('Dot operator used without a left hand value.');

          if (isOperator(expr) && expr.operator === OperatorType.CLOSED_PAREN) {
            let toGo = 1;
            for (let j = i - 3; j >= 0; j--) {
              const token = code[j];
              if (!isOperator(token)) continue;
              if (token.operator === OperatorType.CLOSED_PAREN) toGo++;
              else if (token.operator === OperatorType.OPEN_PAREN) {
                toGo--;
                if (toGo === 0) {
                  expr = this.evaluate(code.slice(j + 1, i - 2));
                  code.splice(j, i - j - 1, expr);
                  i = j + 2;
                }
              }
            }
          } else expr = this.evaluate([expr]);

          code.splice(i - 2, 3, operations.find(OperatorType.DOT)(this, expr, token));
          continue;
        }

        const stdFn = stdFunctions[token.name as keyof typeof stdFunctions] as Function;
        if (stdFn) {
          const args = [...token.args];
          for (let i = 0; i < token.args.length; i++)
            if (!isExpression(token.args[i]) || Array.isArray(token.args[i])) args[i] = this.evaluate([token.args[i]]);

          code[i] = stdFn(...args);
        } else {
          const fn = this.functions.get(token.name);
          if (!fn) throw new Error(`Function ${token.name} is not defined.`);

          const args = [...token.args];
          for (let i = 0; i < token.args.length; i++)
            if (!isExpression(token.args[i]) || Array.isArray(token.args[i])) args[i] = this.evaluate([token.args[i]]);

          const lineBefore = this.line;
          code[i] = this.runFunction(fn, args);
          this.jumpTo(lineBefore);
        }

        continue;
      }

      if (isGroup(token)) {
        code[i] = this.evaluate(token.children);
        continue;
      }
    }

    // replace variables with their expressions
    // only replace to the right of an assignment operator
    const assignmentOperatorIndex = code.findIndex(o => isOperator(o) && o.operator === OperatorType.ASSIGN);
    for (let i = assignmentOperatorIndex + 1; i < code.length; i++) {
      const token = code[i];
      if (!isVariable(token)) continue;

      let value = this.variables.get(token.name);
      if (value === undefined) value = usableConstants[token.name as keyof typeof usableConstants];
      if (value === undefined) throw new Error(`${token.name} is not defined.`);

      code[i] = value;
    }

    return code;
  }

  /**
   * This function content focuses on operators, but calls this.evaluateNonOperators which evaluates the rest.
   * @param tokens Tokens to evaluate
   * @param asArrayExpression If it is an array expression or any array of tokens
   */
  public evaluate(tokens: Token[]): Expression {
    const code = this.evaluateNonOperators(tokens);

    if (code.length === 1 && isExpression(code[0])) return code[0];

    // step 1: convert to postfix
    const pfStack: OperatorToken[] = [];
    const postfix = [];

    // used to tell if a minus sign should be used in a unary way or not
    // For example, 5 * -5
    let previousWasOperator = true;

    // again only evaluate to the right of an assignment operator
    const assignmentOperatorIndex = code.findIndex(o => isOperator(o) && o.operator === OperatorType.ASSIGN);
    for (let i = assignmentOperatorIndex + 1; i < code.length; i++) {
      const token = code[i];

      if (!isOperator(token)) {
        if (isExpression(token)) postfix.push(token);
        previousWasOperator = false;
        continue;
      } else {
        if (previousWasOperator) {
          const isUnary = unaryOperators.includes(token.operator);

          if (token.operator === OperatorType.SUB) pfStack.push({ operator: OperatorType.MINUS });

          if (token.operator !== OperatorType.OPEN_PAREN && !isUnary) continue;
        }

        if (token.operator === OperatorType.CLOSED_PAREN) previousWasOperator = false;
        else previousWasOperator = true;
      }

      let head = pfStack.at(-1);

      if (!head || token.operator === OperatorType.OPEN_PAREN) {
        pfStack.push(token);
        continue;
      }

      if (token.operator === OperatorType.CLOSED_PAREN) {
        while (pfStack.length > 0) {
          const operator = pfStack.pop()!;
          if (operator.operator === OperatorType.OPEN_PAREN) break;

          postfix.push(operator);
        }

        continue;
      }

      if (token.operator !== head.operator || token.operator === OperatorType.INDEX)
        while (pfStack.length > 0 && operations.precedence(head.operator) >= operations.precedence(token.operator)) {
          postfix.push(head);
          pfStack.pop();
          head = pfStack.at(-1)!;
        }

      pfStack.push(token);
    }

    for (let i = pfStack.length - 1; i >= 0; i--) postfix.push(pfStack[i]);

    // step 2: evaluate stack
    let stack: Types[] = [];
    for (const token of postfix) {
      if (!isOperator(token)) {
        stack.push(token);
        continue;
      }

      const isUnary = unaryOperators.includes(token.operator);
      const right = stack.pop();
      const left = !isUnary ? stack.pop() : null;

      const fn = operations.find(token.operator);
      const output = isUnary ? fn(right) : fn(left, right);

      stack.push(output);
    }

    let value = stack[0];
    if (value === undefined) value = null;

    // Check for assignment
    if (assignmentOperatorIndex !== -1) {
      const left = code.slice(0, assignmentOperatorIndex);

      // find second to last index to evaluate everything up to there
      // btw TS doesn't believe findLastIndex is an array method so we have to ignore
      // @ts-ignore
      const lastIndex = left.findLastIndex(o => isOperator(o) && o.operator === OperatorType.INDEX);

      // evaluate everything up to there
      if (lastIndex !== -1) {
        const slice = left.slice(0, lastIndex);
        const output = this.evaluate(slice);

        left.splice(0, lastIndex, output);

        let [arr, _, index] = left;
        if (typeof index !== 'number') throw new Error('Right side of `->` operator is not a number.');

        if (isVariable(arr)) {
          const nameCopy = arr.name;
          arr = this.variables.get(arr.name);
          if (!arr) throw new Error(`${nameCopy} is not defined.`);
        }

        if (typeof arr === 'string') throw new Error('Cannot set the value of a string index as it is read-only.');
        if (!Array.isArray(arr)) throw new Error('Left hand side of `->` operator cannot be indexed.');

        arr[index] = value;
      } else {
        const name = left[0];
        if (!isVariable(name)) throw new Error('Cannot assign a value to a non-variable.');

        this.variables.set(name.name, value);
      }
    }

    // return the expression.
    return value;
  }

  /**
   * Jump to the next line
   * @param exitIfEnd exit if the end of the script has been reached
   */
  public next(exitIfEnd = true) {
    this.line++;
    if (this.line >= this.script.length) {
      if (exitIfEnd) process.exit(0);
      else return null;
    }
    this.code = this.script[this.line];
    return true;
  }

  public jumpTo(line: number) {
    this.line = line;
    this.code = this.script[line];
  }

  /**
   * Find the next `elif`, `else`, or `end` for an if statement.
   */
  public findNextChain() {
    const token = this.code[0];

    if (
      !isKeyword(token) ||
      (token.keyword !== KeywordType.IF && token.keyword !== KeywordType.ELIF && token.keyword !== KeywordType.ELSE)
    )
      throw new Error('Cannot find the next chain of a non-if-like keyword.');

    let toGo = 1;
    while (this.next()) {
      const statement = this.code[0];
      if (!isKeyword(statement)) continue;

      if (statement.keyword === KeywordType.IF || statement.keyword === KeywordType.WHILE) toGo++;
      else if (statement.keyword === KeywordType.END) {
        toGo--;
        if (toGo === 0) return;
      } else if (statement.keyword === KeywordType.ELIF || statement.keyword === KeywordType.ELSE)
        if (toGo === 1) return;
    }

    throw new Error('If statement is never ended.');
  }

  /**
   * Find the nearest end statement. Primarly used for while loops. A loop ending is found before the code is evaluated.
   * If a break statement is used within a loop, the loop end is saved so it does not have to be found again.
   *
   * Also used once an if chain is satisified.
   */
  public findEnd() {
    let toGo = 1;
    while (this.next()) {
      const statement = this.code[0];
      if (!isKeyword(statement)) continue;

      if (statement.keyword === KeywordType.IF || statement.keyword === KeywordType.WHILE) toGo++;
      else if (statement.keyword === KeywordType.END) {
        toGo--;

        if (toGo === 0) return;
      }
    }

    throw new Error('Could not find end of block.');
  }
}
