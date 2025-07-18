import { TextInterface } from "./ui/terminal";
import { Player } from "./player"
import { Shop } from "./shop"

export async function runGame(terminal: TextInterface ) {
  terminal.setTitle('Beginnings');

  const player = new Player;
  player.setGold(100)
  const shop = new Shop;
  
  const playerElement = document.getElementById('player');
  updatePlayerInfo()
  
  function updatePlayerInfo(){
    playerElement!.innerText = `Health: ${player.getHealth()} \n Gold: ${player.getGold()}`;
  }

    //Start
    gotoTownCenter()
  async function gotoStart(){
    await terminal.writeText('You\'re a spartan. Train and beat all of your enemies. Ready?', 100);
    const choice = await terminal.chooseOption([
      { label: 'Aye', value: 'start' },
      { label: 'Nah', value: 'exit' }
    ]);
    
    if (choice === 'start') {
      terminal.setTitle('Game started');
      const name = await terminal.askForInput('What is your name?');
      await terminal.writeText(`Hello, ${name}! Nice to meet you.`, 500);
      player.setName(name);
      terminal.clear();
      gotoTownCenter();
    } else if (choice === 'exit') {
      terminal.setTitle('👋 GOODBYE! 👋');
      await terminal.writeText('Exiting game...', 0);
    }
  }

  //Town Center
  async function gotoTownCenter(){
    terminal.setTitle('Town Center')
    await terminal.writeText('Where would you like to go?', 0)
    const choice = await terminal.chooseOption([
      { label: 'Training Hall', value: 'Training Hall'},
      { label: 'Store', value: 'Store'},
      { label: 'Arena', value: 'Arena'},
    ])
    await terminal.writeText(`Going to the ${choice}.`, 500)
    if(choice == 'Training Hall'){gotoTrainingHall()}
    else if(choice == 'Store'){gotoStore()}
    else{gotoArena()}
  }
  
  //Training Hall

  async function gotoTrainingHall(){

  }
  //Store
  async function gotoStore(){
    terminal.clear()
    await terminal.writeText('What would you like to buy?', 0)

    if (!shop.getVisited()){
      shop.resetDailyItems();
      shop.generateDailyItems(shop.getDailyItemsAmounts())
      shop.setVisited(true)
    }
    const items = [{label:'', value:''}]
    for(let i=0; i<shop.getDailyItemsAmounts(); i++){
      const item = shop.getDailyItem(i)
      items[i] = { label: `${item.label} - - - Cost: ${item.cost} - - - Desc: ${item.description}`, value: `${item.index}`};
    }
    items[shop.getDailyItemsAmounts()] = { label: `Reroll? - - - Cost: 20`, value: 'Reroll'}
    const choice = await terminal.chooseOption(items)
    if (choice=='Reroll' && player.getGold() >=20){
      player.setGold(-20)
      shop.setVisited(false);
      shop.setDailyItemsAmounts(shop.getMaxDailyItemsAmounts())
      updatePlayerInfo()
      gotoStore();
    }
    else if (choice!='Reroll' && shop.getItem(+choice).cost <= player.getGold()){
      const boughtItem = shop.getItem(+choice)
      await terminal.writeText(`Bought ${boughtItem.label}`, 500)
      player.setGold(-boughtItem.cost)
      shop.removeDailyItems(shop.getItem(+choice))
      shop.setDailyItemsAmounts(shop.getDailyItemsAmounts()-1)
      updatePlayerInfo()
      gotoStore();
    }
    else{
      await terminal.writeText("Not enough gold.", 500)
      gotoStore();
    }
  }

  async function gotoArena(){

  }
}