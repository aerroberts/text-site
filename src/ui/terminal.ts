interface TextInterfaceOptions {
  container: HTMLElement;
  prompt?: string;
  typeSpeed?: number;
}

interface ChoiceOption {
  label: string;
  value: any;
}

export class TextInterface {
  private container: HTMLElement;
  private prompt: string;
  private typeSpeed: number;
  private output!: HTMLElement;
  private inputLine!: HTMLElement;
  private currentInput: HTMLInputElement | null = null;
  private isWaitingForInput: boolean = false;
  private title: string = '';
  private titleElement!: HTMLElement;
  private terminalContainer!: HTMLElement;

  constructor(options: TextInterfaceOptions) {
    this.container = options.container;
    this.prompt = options.prompt || '> ';
    this.typeSpeed = options.typeSpeed || 30;
    this.init();
  }

  private init(): void {
    this.container.innerHTML = '';
    this.container.className = 'terminal-wrapper';
    
    // Create title element outside the terminal
    this.titleElement = document.createElement('div');
    this.titleElement.className = 'page-title';
    this.container.appendChild(this.titleElement);
    
    // Create the actual terminal container
    this.terminalContainer = document.createElement('div');
    this.terminalContainer.className = 'terminal';
    this.container.appendChild(this.terminalContainer);
    
    this.output = document.createElement('div');
    this.output.className = 'terminal-output';
    this.terminalContainer.appendChild(this.output);
    
    this.inputLine = document.createElement('div');
    this.inputLine.className = 'terminal-input-line';
    this.terminalContainer.appendChild(this.inputLine);
    
    this.showPrompt();
  }

  public setTitle(title: string): void {
    this.title = title;
    this.titleElement.textContent = title;
    this.titleElement.style.display = title ? 'block' : 'none';
  }

  private showPrompt(): void {
    if (this.isWaitingForInput) return;
    
    this.inputLine.innerHTML = `
      <span class="terminal-prompt">${this.prompt}</span>
      <span class="terminal-cursor">█</span>
    `;
  }

  public async writeText(text: string, speed?: number): Promise<void> {
    const actualSpeed = speed || this.typeSpeed;
    const line = document.createElement('div');
    line.className = 'terminal-line';
    this.output.appendChild(line);

    for (let i = 0; i < text.length; i++) {
      line.textContent += text[i];
      this.scrollToBottom();
      if (actualSpeed > 0) {
        await this.delay(actualSpeed);
      }
    }
  }

  public async writeLines(lines: string[], speed?: number): Promise<void> {
    for (const line of lines) {
      await this.writeText(line, speed);
    }
  }

  public async askForInput(prompt?: string): Promise<string> {
    if (prompt) {
      await this.writeText(prompt);
    }

    return new Promise((resolve) => {
      this.isWaitingForInput = true;
      
      const inputContainer = document.createElement('div');
      inputContainer.className = 'terminal-input-container';
      
      const promptSpan = document.createElement('span');
      promptSpan.className = 'terminal-prompt';
      promptSpan.textContent = this.prompt;
      
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'terminal-input';
      input.autofocus = true;
      
      inputContainer.appendChild(promptSpan);
      inputContainer.appendChild(input);
      
      this.inputLine.innerHTML = '';
      this.inputLine.appendChild(inputContainer);
      
      this.currentInput = input;
      input.focus();
      
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const value = input.value;
          
          // Show the entered command
          const commandLine = document.createElement('div');
          commandLine.className = 'terminal-line';
          commandLine.innerHTML = `<span class="terminal-prompt">${this.prompt}</span>${value}`;
          this.output.appendChild(commandLine);
          
          this.isWaitingForInput = false;
          this.currentInput = null;
          this.showPrompt();
          this.scrollToBottom();
          
          resolve(value);
        }
      });
      
      this.scrollToBottom();
    });
  }

  public async chooseOption(options: ChoiceOption[], prompt?: string): Promise<any> {
    if (prompt) {
      await this.writeText(prompt);
    }

    return new Promise((resolve) => {
      // Create choices container
      const choicesContainer = document.createElement('div');
      choicesContainer.className = 'terminal-choices';
      
      // Create button for each option
      options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'terminal-choice-button';
        button.innerHTML = `<span class="terminal-choice-number">${index + 1}.</span>${option.label}`;
        
        button.addEventListener('click', () => {
          // Show the selected choice in the output
          const choiceLine = document.createElement('div');
          choiceLine.className = 'terminal-line';
          choiceLine.innerHTML = `<span class="terminal-prompt">${this.prompt}</span>Selected: ${option.label}`;
          this.output.appendChild(choiceLine);
          
          // Remove the buttons
          choicesContainer.remove();
          
          // Show prompt again
          this.showPrompt();
          this.scrollToBottom();
          
          resolve(option.value);
        });
        
        // Add keyboard support (Enter and number keys)
        button.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click();
          }
        });
        
        choicesContainer.appendChild(button);
      });
      
      // Add choices to output
      this.output.appendChild(choicesContainer);
      
      // Focus first button
      const firstButton = choicesContainer.querySelector('.terminal-choice-button') as HTMLButtonElement;
      if (firstButton) {
        firstButton.focus();
      }
      
      // Add number key support for quick selection
      const keyHandler = (e: KeyboardEvent) => {
        const num = parseInt(e.key);
        if (num >= 1 && num <= options.length) {
          e.preventDefault();
          const button = choicesContainer.children[num - 1] as HTMLButtonElement;
          button.click();
          document.removeEventListener('keydown', keyHandler);
        }
      };
      
      document.addEventListener('keydown', keyHandler);
      
      // Clean up event listener when choice is made
      const cleanup = () => {
        document.removeEventListener('keydown', keyHandler);
      };
      
      // Store cleanup function to remove listener if needed
      choicesContainer.addEventListener('click', cleanup);
      
      this.scrollToBottom();
    });
  }

  public clear(): void {
    this.output.innerHTML = '';
    this.scrollToBottom();
  }

  public async typewriterEffect(text: string, speed: number = 50): Promise<void> {
    await this.writeText(text, speed);
  }

  private scrollToBottom(): void {
    this.terminalContainer.scrollTop = this.terminalContainer.scrollHeight;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public focus(): void {
    if (this.currentInput) {
      this.currentInput.focus();
    }
  }
} 