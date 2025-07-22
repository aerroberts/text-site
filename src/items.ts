interface Effect{
    effect:string;
    amount:number;
}

export interface Item{
    label:string;
    cost:number;
    description?:string;
    effect: Effect;
    index: number
}

//Instead of hardcoding the items, create a file to load them in
export class Items{
    private itemsArray:Item[] = 
    [
        {label: 'Bad Sword', cost: 5, description:'You\'d be better just removing your pants', effect:{effect:'attack', amount:2}, index:0},
        {label: 'Good Sword', cost: 10, description:'Can keep pants on', effect:{effect:'attack', amount:4}, index:1},
        {label: 'Great Sword', cost: 25, description:'Terror of the unholy', effect:{effect:'attack', amount:10}, index:2},
        {label: 'Armor', cost: 7, description:'Actual protect yourself', effect:{effect:'healthBoost', amount:50}, index:3},
        {label: 'Potion', cost: 10, description:'A lil somethin somethin', effect:{effect: 'potion', amount:1}, index:4},
        {label: 'Potion', cost: 10, description:'A lil somethin somethin', effect:{effect: 'potion', amount:1}, index:5},
        {label: 'Running Shoes', cost: 20, description:'Run faster', effect:{effect: 'speed', amount:3}, index:6},
        {label: 'Alchemy', cost: 25, description:'Turn dead bodies into extra gold', effect:{effect: 'goldBuff', amount:5}, index:7}
    ];
    
    public getItem(index:number){
        return this.itemsArray[index];
    }

    public getItemsArray(){
        return this.itemsArray
    }
}