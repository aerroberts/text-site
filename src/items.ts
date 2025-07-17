interface Effect{
    healthBoost?:number;
    tempHealth?:number;
    attack?:number;
}

export interface Item{
    label:string;
    cost:number;
    description?:string;
    effect?: Effect;
    index: number
}

//Instead of hardcoding the items, create a file to load them in
export class Items{
    private itemsArray:Item[] = 
    [
        {label: 'Bad Sword', cost: 5, description:'You\'d be better just removing your pants', effect:{attack:2}, index:0},
        {label: 'Good Sword', cost: 10, description:'Can keep pants on', effect:{attack:4}, index:1},
        {label: 'Great Sword', cost: 25, description:'Terror of the unholy', effect:{attack:10}, index:2},
        {label: 'Armor', cost: 7, description:'Actual protect yourself', effect:{healthBoost:5}, index:3},
        {label: 'Potion', cost: 10, description:'A lil somethin somethin', effect:{tempHealth:10}, index:4},
        {label: 'Potion', cost: 10, description:'A lil somethin somethin', effect:{tempHealth:-10}, index:5}
    ];
    
    public getItem(index:number){
        return this.itemsArray[index];
    }

    public getItemsArray(){
        return this.itemsArray
    }
}