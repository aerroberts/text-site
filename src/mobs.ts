import { Maths } from "./math"

const math = new Maths

export interface mob_stats{
    health:number,
    name:string,
    attack:number,
    speed:number
}

export class Mob{
    private maxStats:mob_stats = {
        health: 10,
        name:'',
        attack:10,
        speed:10
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

    public generateMob(){
        return{
            health: math.randomFromRange(this.maxStats.health, false),
            name: this.generateName(),
            attack: math.randomFromRange(this.maxStats.attack, false),
            speed:math.randomFromRange(this.maxStats.speed, false)
        }
    }
    private generateName(){
        const modifier:string = this.nameModifiers[math.randomFromRange(this.nameModifiers.length, true)]
        const firstName:string = this.firstNames[math.randomFromRange(this.firstNames.length, true)]
        return `The ${modifier} ${firstName}`
    }
}