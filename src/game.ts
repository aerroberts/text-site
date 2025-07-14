import { TextInterface } from "./ui/terminal";




interface GameState { 
  readonly hero: string;
}

const gameState: GameState = {
  hero: 'Hero' 
}


export async function runGame(terminal: TextInterface ) {
  terminal.setTitle('🎮 ADVENTURE GAME 🎮');

  const healthElement = document.getElementById('health1');
    healthElement!.innerText = 'Health: 100%';
  
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