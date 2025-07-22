import { Maths } from "./math"

const math = new Maths

export interface mob_stats{
    health:number,
    name:string,
    attack:number,
    speed:number
}

export class Mob{
    private defStats:mob_stats = {
        health: 10,
        name:'',
        attack:8,
        speed:10
    }
    private maxStats:mob_stats = {
        health: 40,
        name: '',
        attack: 35,
        speed: 10
    }

    private defBossStats:mob_stats = {
        health:100,
        name: '',
        attack:20,
        speed:20
    }
    private nameModifiers:string[] = [
        'Meager', 'Weakling', 'Doofus', 'Egregious', 'Serpentine', 'Magnanimous', 'Boisterous','Big','Fatty','Fearful','Dreadful','Strong','Stinky'
    ]
    private firstNames:string[] = [
        'Steve','Alfonzo','Troll man','Anthony','Lapse in judgement','AAAAAAAAA'
    ]

    // public attack(){
    //     return Math.floor(Math.random() * (this.stats.attack))
    // }

    public generateMob(playerAttack: number){
        let health = math.randomFromRange(this.defStats.health, false);
        let attack = math.randomFromRange(this.defStats.attack+(playerAttack/1.75), false)
        if (health>this.maxStats.health){health = this.maxStats.health}
        if (attack>this.maxStats.attack){attack = this.maxStats.attack}
        return{
            health: health,
            name: this.generateName(),
            attack: attack,
            speed:math.randomFromRange(this.defStats.speed, false)
        }
    }
    private generateName(){
        const modifier:string = this.nameModifiers[math.randomFromRange(this.nameModifiers.length, true)]
        const firstName:string = this.firstNames[math.randomFromRange(this.firstNames.length, true)]
        return `The ${modifier} ${firstName}`
    }
    public generateBoss(){
        return{
            health: math.randomFromRange(this.defBossStats.health, false)+200,
            name: this.generateName(),
            attack: math.randomFromRange(this.defBossStats.attack, false)+40,
            speed:math.randomFromRange(this.defBossStats.speed, false)+40
        }
    }
}