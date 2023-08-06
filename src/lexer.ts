import type {
  FunctionCallToken,
  FunctionDeclarationToken,
  GroupToken,
  KeywordToken,
  OperatorToken,
  Token,
  VariableToken
} from './types';
import { allowedVariableNameChars, keywords, operatorWords, operators, valueWords } from './constants';
import { OperatorType } from './enums';

/**
 * Converts the line of script into an array of tokens
 * @param code line of the script
 */
export function lexer(code: string): Token[] {
  const tokens: Token[] = [];

  main: while (true) {
    // trim
    code = code.trim();

    if (code.length === 0 || code.startsWith('#')) return tokens;

    // check for number
    if (!Number.isNaN(+code[0])) {
      const [num, size] = createNumber(code);
      tokens.push(num);
      code = code.slice(size);
      continue;
    }

    // check for string
    if (code[0] === '"') {
      const stringRegex = /^"((?:\\.|[^"\\])*)"/; // Regex to match a string including escape sequences
      const match = code.match(stringRegex);

      if (match) {
        const token = match[1].replace(/\\(.)/g, (match, escapedChar) => {
          const escapeMap = { n: '\n', t: '\t', '\\': '\\' };
          return escapeMap[escapedChar as keyof typeof escapeMap] || escapedChar;
        });
        tokens.push(token);
        code = code.slice(match[0].length);

        continue;
      }

      throw new Error('Unclosed quotation marks.');
    }

    // check for array
    if (code[0] === '[') {
      const close = findClosingBracket(code, '[', ']', 0);
      if (close === -1) throw new Error('Unclosed array.');

      if (code.slice(1, close).length === 0) {
        tokens.push([]);
        code = code.slice(close + 1);
        continue;
      }

      const values = separate(code.slice(1, close));
      const arrayValues: Token[] = [];

      for (const value of values) {
        const output = lexer(value);
        if (output.length > 1) arrayValues.push({ children: output } as GroupToken);
        else arrayValues.push(output[0]);
      }

      tokens.push(arrayValues);

      code = code.slice(close + 1);
      continue;
    }

    // check for any keyword, word operators, booleans, NaN, and void
    // note that booleans and void are NOT keywords

    let spaceIndex = code.indexOf(' ');
    if (spaceIndex === -1) spaceIndex = code.length;

    const keywordString = code.slice(0, spaceIndex);

    if (keywordString in valueWords) {
      const value = valueWords[keywordString as keyof typeof valueWords];
      tokens.push(value);
      code = code.slice(spaceIndex + 1);
      continue;
    }

    const keyword = keywords[keywordString as keyof typeof keywords];
    if (keyword) {
      const keywordToken: KeywordToken = {
        keyword
      };

      tokens.push(keywordToken);
      code = code.slice(spaceIndex + 1);
      continue;
    }

    // check for word operator
    const wordOperator = operators[keywordString as keyof typeof operators];
    if (wordOperator) {
      const operatorToken: OperatorToken = {
        operator: wordOperator
      };

      tokens.push(operatorToken);
      code = code.slice(spaceIndex + 1);
      continue;
    }

    // check for operator
    let size: number = 0;
    let operator: OperatorType | undefined = undefined;

    for (let s = code.length; s >= 0; s--) {
      operator = operators[code.slice(0, s) as keyof typeof operators];
      if (operator && !operatorWords.includes(operator)) {
        size = s;
        break;
      }
    }

    if (operator) {
      const operatorToken: OperatorToken = {
        operator
      };

      tokens.push(operatorToken);

      code = code.slice(size);
      continue;
    }

    // check for function DECLARATION
    if (code.startsWith('function ')) {
      code = code.slice(9);
      const beginArgsList = code.indexOf('(');
      if (beginArgsList === -1) throw new Error('Invalid function declaration syntax.');

      const name = code.slice(0, beginArgsList);
      if (name.length === 0) throw new Error('Function must have a name.');

      const endArgsList = code.indexOf(')');
      if (endArgsList === -1) throw new Error('Unclosed paranthesis.');

      const args = code
        .slice(beginArgsList + 1, endArgsList)
        .split(', ')
        .map(arg => arg.trim())
        .filter(arg => arg.length > 0);

      const functionToken: FunctionDeclarationToken = {
        name,
        args,
        line: 0 // unknown
      };

      tokens.push(functionToken);

      return tokens; // there shouldn't be anything else after a function declaration
    }

    // check for parantheses
    // Although a group could be used here, it is unnecessary. Recursion can very easily be avoided by just using a parantheses operator
    // Therefore, it is.
    if (code[0] === '(' || code[0] === ')') {
      const operator: OperatorToken = {
        operator: code[0] === '(' ? OperatorType.OPEN_PAREN : OperatorType.CLOSED_PAREN
      };

      tokens.push(operator);
      code = code.slice(1);
      continue;
    }

    // check for a function CALL
    let prev = code[0];
    for (let i = 1; i < code.length; i++) {
      const c = code[i];
      // hyper lazy but whatever
      if (c !== '(' && !allowedVariableNameChars.includes(c)) break;

      if (prev === ' ' && c !== ' ' && c !== '(') break;

      if (c === '(') {
        const name = code.slice(0, i).trim();

        const end = findClosingBracket(code, '(', ')', i);
        if (end === -1) throw new Error('Unclosed parantheseis.');

        const slice = code.slice(i + 1, end);
        const argsString = slice.length > 0 ? separate(code.slice(i + 1, end)) : [];

        const args: Token[] = [];
        for (const arg of argsString) {
          const output = lexer(arg);
          if (output.length === 1) args.push(output[0]);
          else args.push({ children: output } as GroupToken);
        }

        const functionToken: FunctionCallToken = {
          name,
          args
        };

        tokens.push(functionToken);

        code = code.slice(end + 1);
        continue main;
      }

      prev = c;
    }

    let name = '';
    for (const c of code) {
      if (!allowedVariableNameChars.includes(c)) break;
      name += c;
    }

    if (name.length === 0) throw new Error('Unknown token.');

    const variableToken: VariableToken = {
      name
    };

    tokens.push(variableToken);
    code = code.slice(name.length);
    continue;
  }
}

/**
 * Used instead of parseFloat to accurately calculate how large the number is so it can be spliced from the code.
 * @param code line of the script
 * @returns [number, size]
 */
function createNumber(code: string) {
  let num = 0;
  let shift = 10; // 1 when working with decimals.
  let multiplier = 1; // increasingly divides by ten when working with decimals

  for (let i = 0; i < code.length; i++) {
    const c = code[i];
    const digit = +c;

    if (c !== ' ' && !Number.isNaN(digit)) {
      num *= shift;
      num += digit * multiplier;
      if (multiplier < 1) multiplier /= 10;
      continue;
    } else if (c === '.') {
      if (multiplier !== 1) throw new Error('Invalid number');
      shift = 1;
      multiplier = 0.1;
      continue;
    }

    return [num, i];
  }

  return [num, code.length];
}

/**
 * Find the index of a paranthesis that closes the provided one
 * @param index index of the openinig bracket
 */
function findClosingBracket(
  code: string,
  openBracket: string,
  closedBracket: string,
  index: number,
  ignoreStrings = true
) {
  if (code[index] !== openBracket) throw new Error('Index does not point to open bracket.');

  let inString = false;
  let toGo = 1;

  for (let i = index + 1; i < code.length; i++) {
    const c = code[i];
    if (ignoreStrings && c === '"' && code[i - 1] !== '\\') inString = !inString;

    if (!inString) {
      if (c === openBracket) toGo++;
      else if (c === closedBracket && --toGo === 0) return i;
    }
  }

  return -1;
}

/**
 * Seperate the values of an array or function call arguments.
 * Used for nested arguments
 * Example: `[1, 2, [3, 4, 5]]` or `print(a(b, c), a(d, e))`
 */
function separate(str: string) {
  const result = [];
  let currentChunk = '';
  let stack = [];
  let inString = false;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === '"' && (i === 0 || str[i - 1] !== '\\')) {
      inString = !inString;
    }

    if (!inString) {
      if (char === '[' || char === '(') {
        stack.push(char);
      } else if (char === ']' || char === ')') {
        stack.pop();
      }
    }

    if (char === ',' && stack.length === 0 && !inString) {
      result.push(currentChunk.trim());
      currentChunk = '';
    } else {
      currentChunk += char;
    }
  }

  result.push(currentChunk.trim());
  return result;
}
