export class Maths{
    public randomFromRange(limit:number, fromZero:boolean){
        if(fromZero){return Math.floor(Math.random() * (limit))}
        else{
            return Math.floor(Math.random() * (limit) + 1)
        }
    }
}