import fs from 'fs';
import { lexer } from './lexer';
import { Token } from './types';
import { RunTime } from './runtime';

const args = process.argv.slice(2);
const scriptFile = args.join(' ');
if (scriptFile.length === 0) {
  console.error('Error: file not provided.');
  process.exit(1);
}

let script: string[] = [];
try {
  script = fs.readFileSync(scriptFile, 'utf8').split('\n');
} catch {
  console.error(`Error: File not found: ${scriptFile}`);
  process.exit(1);
}

const lexScript: Token[][] = [];

for (let i = 0; i < script.length; i++) {
  const line = script[i];

  try {
    const lex = lexer(line);
    lexScript.push(lex);
  } catch (e: any) {
    console.error(`Lexer error at line ${i + 1}: ${e.message}\n${e.stack.split('\n').slice(1).join('\n')}`);
    process.exit(1);
  }
}

const runtime = new RunTime(lexScript);
try {
  runtime.run();
} catch (e: any) {
  console.error(`Runtime error at line ${runtime.line + 1}: ${e.message}\n${e.stack.split('\n').slice(1).join('\n')}`);
  process.exit(1);
}
