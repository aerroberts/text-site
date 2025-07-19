import { TextInterface } from "./ui/terminal";
import { Player } from "./player"
import { Shop } from "./shop"
import { Mob, mob_stats } from "./mobs"

export async function runGame(terminal: TextInterface ) {
  terminal.setTitle('Beginnings');

  const player = new Player;
  const shop = new Shop;
  const mob = new Mob;
  
  const playerElement = document.getElementById('player');
  updatePlayerInfo()
  
  function updatePlayerInfo(){
    playerElement!.innerText = `Health: ${player.getHealth()} \n Gold: ${player.getGold()} \n Attack: ${player.getAttack()} \n Potions: ${player.getPotions()}`;
  }

    //Start
    gotoStart()
  async function gotoStart(){
    terminal.clear()
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
    terminal.clear()
    terminal.setTitle('Town Center')
    await terminal.writeText('Where would you like to go?', 0)
    const choice = await terminal.chooseOption([
      { label: 'Villainous Lair', value: 'Villainous Lair'},
      { label: 'Store', value: 'Store'},
      { label: 'Arena', value: 'Arena'},
    ])
    await terminal.writeText(`Going to the ${choice}.`, 500)
    if(choice == 'Villainous Lair'){gotoVillainousLair()}
    else if(choice == 'Store'){gotoStore()}
    else{gotoArena()}
  }
  
  //Villainous Lair

  async function gotoVillainousLair(){
    terminal.clear()
    await terminal.writeText('Welcome to the Villainous Lair. Battle baddies, be bathed in bucks. (Win = Money). Continue?', 0)
    const choice = await terminal.chooseOption([
      { label: 'Yes', value: 'yes'},
      { label: 'Back to Town Center', value: 'Town Center'}
    ])
      if(choice=='Town Center'){ gotoTownCenter()}
      else{
        gotoBattle()
      }
  }

  //Battle
  async function gotoBattle(){
    terminal.clear()
    await terminal.writeText('A new villain appears. Fight!', 500)
    const newEnemy = mob.generateMob()
    if(newEnemy.speed > player.getSpeed()){
      enemyTurn(newEnemy)
    }
    else{
      playerTurn(newEnemy)
    }
  }

  async function enemyTurn(enemy:mob_stats){
    terminal.clear()
    await terminal.writeText(`${enemy.name} did ${enemy.attack} damage`, 200)
    if(player.getHealth() <= enemy.attack){
      player.setHealth(-player.getHealth())
      updatePlayerInfo()
      await terminal.writeText('You lose. Game over.', 500)
      gotoStart()
    }
    else{
      player.setHealth(-enemy.attack)
      updatePlayerInfo()
      playerTurn(enemy)
    }
  }

  async function playerTurn(enemy:mob_stats){
    const choice = await terminal.chooseOption([
      {label: "Attack", value:"attack"},
      {label: "Heal", value:"heal"}
    ])
    if(choice=="heal"){
      if(player.getPotions()>0){
        player.handleEffects({effect: 'tempHealth', amount: 10})
        player.setPotions(-1)
        await terminal.writeText("Imbibed a potion. +10 health.", 250)
        updatePlayerInfo()
      }
      enemyTurn(enemy)
    }
    if(choice=='attack'){
      if(player.getAttack() < enemy.health){
        enemy.health-=player.getAttack()
        await terminal.writeText(`You did ${player.getAttack()} damage. \n${enemy.name} now has ${enemy.health} health left.`, 250)
        enemyTurn(enemy)
      }
      else{
        enemy.health=0
        await terminal.writeText(`You did ${player.getAttack()} damage. \n${enemy.name} has been defeated.\n+5 gold. Continue?`, 250)
        player.setGold(5)
        updatePlayerInfo()
        const choice = await terminal.chooseOption([
        { label: 'Yes', value: 'yes'},
        { label: 'No', value: 'Town Center'}
        ])
        if(choice=='Town Center'){ gotoTownCenter()}
        else{
          gotoBattle()
        }
      }
    }
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
    items[shop.getDailyItemsAmounts()] = { label: `Reroll? - - - Cost: 10`, value: 'Reroll'}
    items.push({ label: `Town Center`, value: 'Town Center'})
    const choice = await terminal.chooseOption(items)
    if (choice=='Reroll' && player.getGold() >=7){
      player.setGold(-7)
      shop.setVisited(false);
      shop.setDailyItemsAmounts(shop.getMaxDailyItemsAmounts())
      updatePlayerInfo()
      gotoStore();
    }
    else if(choice=='Town Center'){
      gotoTownCenter()
    }
    else if (choice!='Reroll' && choice!='Town Center' && shop.getItem(+choice).cost <= player.getGold()){
      const boughtItem = shop.getItem(+choice)
      await terminal.writeText(`Bought ${boughtItem.label}`, 500)
      player.handleEffects(boughtItem.effect)
      player.setGold(-boughtItem.cost)
      shop.removeDailyItems(shop.getItem(+choice))
      shop.setDailyItemsAmounts(-1, true)
      updatePlayerInfo()
      gotoStore();
    }
    else{
      await terminal.writeText("Not enough gold.", 500)
      gotoStore();
    }
  }

  async function gotoArena(){
    terminal.clear()
    await terminal.writeText('Welcome to the arena. Only for those who have accepted death', 0)
  }
}