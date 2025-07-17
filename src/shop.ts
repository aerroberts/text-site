import { Item, Items } from "./items"

const items = new Items

export class Shop {
    private visited:boolean = false

    private dailyItems:Item[] = []

    private shopItemsArray:Item[] = items.getItemsArray()

    public getVisited(){
        return this.visited
    }

    public setVisited(bool:boolean){
        this.visited = bool
    }

    public getShopItemsArrayLength(){
        return this.shopItemsArray.length;
    }

    public addDailyItems(item:Item) {
        this.dailyItems[this.dailyItems.length] = item
    }

    public getDailyItems() {
        return this.dailyItems
    }

    public generateDailyItems(amount:number){

    }

    public getRandomShopItem(availItems:number[]){
        const index = availItems[Math.floor(Math.random() * (availItems.length-1) + 1)]
        return {item: this.shopItemsArray[index], index: index}
    }

    public getItem(index:number){
        return this.shopItemsArray[index]
    }
    
}