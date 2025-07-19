import { Item, Items } from "./items"
import { Maths } from "./math"

const math = new Maths
const items = new Items

export class Shop {
    private visited:boolean = false
    private maxDailyItems:number = 3
    private dailyItemsAmount:number = 3
    private dailyItems:Item[] = []

    private shopItemsArray:Item[] = items.getItemsArray()

    public getMaxDailyItemsAmounts(){
        return this.maxDailyItems
    }

    public getDailyItemsAmounts(){
        return this.dailyItemsAmount;
    }

    public setDailyItemsAmounts(amount:number, add?:boolean){
        if(add){this.dailyItemsAmount+=amount}
        else{
            this.dailyItemsAmount=amount
        }
    }

    public getVisited(){
        return this.visited
    }

    public setVisited(bool:boolean){
        this.visited = bool
    }

    public addDailyItems(item:Item) {
        this.dailyItems[this.dailyItems.length] = item
    }

    public removeDailyItems(item:Item){
        const index = this.dailyItems.indexOf(item)
        this.dailyItems.splice(index, 1)
    }

    public getDailyItem(index:number){
        return this.dailyItems[index]
    }

    public getDailyItems() {
        return this.dailyItems
    }

    public resetDailyItems(){
        this.dailyItems = []
    }

    public generateDailyItems(amount:number){
        const potentialItems = [];
        for(let i=0; i<this.shopItemsArray.length; i++){
            potentialItems[i] = i
        }
        for(let i=0; i<amount; i++){
            const randItem = this.getRandomShopItem(potentialItems);
            potentialItems.splice(potentialItems.indexOf(randItem.index), 1);
            this.dailyItems[i] = randItem.item;
        }
        return this.dailyItems
    }

    public getRandomShopItem(availItems:number[]){
        const index = availItems[math.randomFromRange(availItems.length, true)]
        return {item: this.shopItemsArray[index], index: index}
    }

    public getItem(index:number){
        return this.shopItemsArray[index]
    }
    
}