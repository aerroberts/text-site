import { TextInterface } from "./ui/terminal";

export async function runGame(terminal: TextInterface ) {
  await terminal.writeText('Welcome to the game!');
  const choice = await terminal.chooseOption([
    { label: 'Start Game', value: 'start' },
    { label: 'Exit', value: 'exit' }
  ]);
  if (choice === 'start') {
    await terminal.writeText('Starting game...');
  } else if (choice === 'exit') {
    await terminal.writeText('Exiting game...');
  }
}