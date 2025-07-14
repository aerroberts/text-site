import './style.css';
import { TextInterface } from './ui/terminal';
import { runGame } from './game';

// Initialize the terminal interface when the page loads
document.addEventListener('DOMContentLoaded', async () => {
  const appContainer = document.querySelector('#app') as HTMLElement;
  
  if (!appContainer) {
    console.error('Could not find app container');
    return;
  }

  // Create the text interface
  const terminal = new TextInterface({
    container: appContainer,
    prompt: '$ ',
    typeSpeed: 20
  });

  await runGame(terminal);    
});

// Handle window focus to refocus the terminal input
window.addEventListener('focus', () => {
  const terminal = document.querySelector('.terminal');
  if (terminal) {
    const input = terminal.querySelector('.terminal-input') as HTMLInputElement;
    if (input) {
      input.focus();
    }
  }
}); 