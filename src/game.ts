import { TextInterface } from "./ui/terminal";
import { Player } from "./player"
import { Items} from "./items"
import { Shop } from "./shop"

export async function runGame(terminal: TextInterface ) {
  terminal.setTitle('Beginnings');

  const items = new Items;

  const player = new Player;
  player.setLocation('Store')
  player.setGold(100)
  const shop = new Shop;
  
  const playerElement = document.getElementById('player');
  updatePlayerInfo()
  
  function updatePlayerInfo(){
    playerElement!.innerText = `Health: ${player.getHealth()} \n Gold: ${player.getGold()}`;
  }

    //Start
  if(player.getLocation()=='Start'){
    await terminal.writeText('You\'re a spartan. Train and beat all of your enemies. Ready?');
    const choice = await terminal.chooseOption([
      { label: 'Aye', value: 'start' },
      { label: 'Nah', value: 'exit' }
    ]);
    
    if (choice === 'start') {
      terminal.setTitle('Game started');
      const name = await terminal.askForInput('What is your name?');
      await terminal.writeText(`Hello, ${name}! Nice to meet you.`);
      player.setName(name);
      terminal.clear();
      player.setLocation('Town_Center');
    } else if (choice === 'exit') {
      terminal.setTitle('👋 GOODBYE! 👋');
      await terminal.writeText('Exiting game...');
    }
  }

  //Town Center
  if(player.getLocation() == 'Town_Center'){
    terminal.setTitle('Town Center')
    await terminal.writeText('Where would you like to go?')
    const choice = await terminal.chooseOption([
      { label: 'Training Hall', value: 'Training Hall'},
      { label: 'Store', value: 'Store'},
      { label: 'Arena', value: 'Arena'},
    ])
    await terminal.writeText(`Going to the ${choice}`)
    player.setLocation(`${choice}`)
  }
  
  //Training Hall

  //Store
  if(player.getLocation() == 'Store'){
    terminal.clear()
    await terminal.writeText('What would you like to buy?')
    //generate shop inventory
    //Creates an array of every shop item index
    const potentialItems = [];
    for(let i=0; i<shop.getShopItemsArrayLength(); i++){
      potentialItems[i] = i
    }
    //Generates a random index from that list, grabs that item, and removes the index from the list of potential items
    const shopItems = [];
    for(let i=0; i<3; i++){
      const randItem = shop.getRandomShopItem(potentialItems);
      potentialItems.splice(potentialItems.indexOf(randItem.index), 1);
      shopItems[i] = { label: `${randItem.item.label} - - - Cost: ${randItem.item.cost} - - - Desc: ${randItem.item.description}`, value: `${randItem.item.index}`};
    }
    const boughtItem = shop.getItem(+await terminal.chooseOption(shopItems))
    await terminal.writeText(`Bought ${boughtItem.label}`)
    player.setGold(-boughtItem.cost)
    updatePlayerInfo()
  }
}