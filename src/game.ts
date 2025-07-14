import { TextInterface } from "./ui/terminal";

export async function runGame(terminal: TextInterface ) {
  terminal.setTitle('🎮 ADVENTURE GAME 🎮');
  
  await terminal.writeText('Welcome to the game!');
  const choice = await terminal.chooseOption([
    { label: 'Start Game', value: 'start' },
    { label: 'Exit', value: 'exit' }
  ]);
  if (choice === 'start') {
    terminal.setTitle('🗡️ THE BRAVE ADVENTURER 🗡️');
    await terminal.writeText('Starting game...');
    const name = await terminal.askForInput('What is your name?');
    await terminal.writeText(`Hello, ${name}! Nice to meet you.`);
    terminal.setTitle(`⚔️ ${name.toUpperCase()}'S ADVENTURE ⚔️`);
    await terminal.writeText('You are a brave adventurer. You died. The end.');
  } else if (choice === 'exit') {
    terminal.setTitle('👋 GOODBYE! 👋');
    await terminal.writeText('Exiting game...');
  }
}