import { TextInterface } from "./ui/terminal";

export async function runGame(terminal: TextInterface ) {
  await terminal.writeText('Welcome to the game!');
}