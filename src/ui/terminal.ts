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

  constructor(options: TextInterfaceOptions) {
    this.container = options.container;
    this.prompt = options.prompt || '> ';
    this.typeSpeed = options.typeSpeed || 30;
    this.init();
  }

  private init(): void {
    this.container.innerHTML = '';
    this.container.className = 'terminal';
    
    this.output = document.createElement('div');
    this.output.className = 'terminal-output';
    this.container.appendChild(this.output);
    
    this.inputLine = document.createElement('div');
    this.inputLine.className = 'terminal-input-line';
    this.container.appendChild(this.inputLine);
    
    this.showPrompt();
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

    // Display options
    for (let i = 0; i < options.length; i++) {
      await this.writeText(`${i + 1}. ${options[i].label}`);
    }

    while (true) {
      const choice = await this.askForInput('Select an option (1-' + options.length + '): ');
      const choiceNum = parseInt(choice);
      
      if (choiceNum >= 1 && choiceNum <= options.length) {
        return options[choiceNum - 1].value;
      } else {
        await this.writeText('Invalid choice. Please try again.');
      }
    }
  }

  public clear(): void {
    this.output.innerHTML = '';
    this.scrollToBottom();
  }

  public async typewriterEffect(text: string, speed: number = 50): Promise<void> {
    await this.writeText(text, speed);
  }

  private scrollToBottom(): void {
    this.container.scrollTop = this.container.scrollHeight;
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