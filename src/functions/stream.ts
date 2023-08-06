import { Expression } from '../types';
import readline from 'readline-sync';

export function print(...message: Expression[]) {
  console.log(...message);

  return null;
}

export function prompt(message: Expression) {
  if (message && typeof message !== 'string') throw new Error('Prompt message must be a string or void.');

  const answer = readline.question(message ?? '', {  });
  return answer;
}
