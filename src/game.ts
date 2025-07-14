import { TextInterface } from "./ui/terminal";

export async function runGame(terminal: TextInterface ) {
  await terminal.writeText('Welcome to the game!');
  const choice = await terminal.chooseOption([
    { label: 'Start Game', value: 'start' },
    { label: 'Exit', value: 'exit' }
  ]);
  if (choice === 'start') {
    await terminal.writeText('Starting game...');
    const name = await terminal.askForInput('What is your name?');
    await terminal.writeText(`Hello, ${name}! Nice to meet you.`);
    await terminal.writeText('You are a brave adventurer. You died. The end.');
  } else if (choice === 'exit') {
    await terminal.writeText('Exiting game...');
  }
}