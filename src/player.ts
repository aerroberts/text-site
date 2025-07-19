export class Player {

    private maxHealth:number = 100;
    private health: number = 100;
    private name: string = ''
    private location: string = ''
    private gold: number = 0
    private attack: number = 2;
    private speed: number = 5
    private potions: number = 0;

    public setPotions(amount:number){
        this.potions+=amount
    }
    public getPotions(){
        return this.potions
    }

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
        if(this.health+health<this.maxHealth){
            this.health+=health
        }
        else{
            this.health=this.maxHealth
        };
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
    public setAttack(amount:number){
        this.attack+=amount
    }
    public getAttack(){
        return this.attack
    }
    public setMaxHealth(amount:number){
        this.maxHealth+=amount
    }
    public setSpeed(amount:number){
        this.speed+=amount
    }
    public getSpeed(){
        return this.speed
    }
    public handleEffects(effect:{effect:string, amount:number}){
        if(effect.effect=='attack'){
            this.setAttack(effect.amount)
        }
        else if(effect.effect=='healthBoost'){
            this.setMaxHealth(effect.amount)
            this.setHealth(effect.amount)
        }
        else if(effect.effect=='tempHealth'){
            this.setHealth(effect.amount)
        }
        else if(effect.effect=='speed'){
            this.setSpeed(effect.amount)
        }
        else if(effect.effect=='potion'){
            this.setPotions(effect.amount)
        }
    }
}