import { TextInterface } from "./controller/terminal";

export async function runGame(terminal: TextInterface ) {
  await terminal.writeText('Welcome to the game!');
}