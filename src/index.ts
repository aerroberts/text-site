import './style.css';
import { TextInterface } from './ui/terminal';
import { runGame } from './game';


const appContainer = document.querySelector('#app') as HTMLElement;
runGame(new TextInterface({
  container: appContainer,
  prompt: '$ ',
  typeSpeed: 20
}));    
