export class Player {


    private health: number = 100;
    private name: string = ''
    private location: string = ''
    private gold: number = 0

    public setName(name:string): void {
        this.name = name;
    }
    public getName(){
        return this.name
    }
    public setLocation(location:string): void {
        this.location = location;
    }
    public getLocation(){
        return this.location
    }
    public setHealth(health:number): void {
        this.health = health;
    }
    public getHealth(){
        return this.health
    }
    public setGold(amount:number) {
        this.gold+=amount
    }
    public getGold(){
        return this.gold
    }
}