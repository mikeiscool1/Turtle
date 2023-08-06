import readline from 'readline-sync';
import { RunTime } from './runtime';
import { lexer } from './lexer';
import { KeywordType } from './enums';
import { KeywordToken } from './types';

console.log('TL-SHELL (Turtle Shell)\nRun "exit" or Ctrl+C to exit the shell.');

const runtime = new RunTime([]);

while (true) {
  const input = readline.question(': ');
  if (input.trim() === 'exit') process.exit(0);

  try {
    const output = run(input);
    console.log(output);
  } catch (e: any) {
    console.error(e)
  }
}

function run(line: string) {
  const lexScript: any[] = [{ keyword: KeywordType.RETURN }];
  try {
    const lex = lexer(line);
    lexScript.push(...lex);
  } catch (e: any) {
    throw `Lexer error: ${e.message}`;
  }

  runtime.script = [lexScript];
  runtime.jumpTo(0);
  
  try {
    return runtime.run();
  } catch (e: any) {
    throw `Runtime error: ${e.message}`;
  }
}
