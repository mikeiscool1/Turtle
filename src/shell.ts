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

  run([`print(${input})`]);
}

function run(script: string[]) {
  const lexScript = [];
  for (let i = 0; i < script.length; i++) {
    const line = script[i];
    try {
      const lex = lexer(line);
      lexScript.push(lex);
    } catch (e: any) {
      console.error(`Lexer error at line ${i + 1}: ${e.message}`);
    }
  }

  // avoid exiting
  lexScript.push([{ keyword: KeywordType.RETURN } as KeywordToken]);

  runtime.script = lexScript;
  runtime.jumpTo(0);
  
  try {
    runtime.run();
  } catch (e: any) {
    console.error(`Runtime error at line ${runtime.line + 1}: ${e.message}`);
  }
}
