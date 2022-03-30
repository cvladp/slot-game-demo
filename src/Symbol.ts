import * as PIXI from  'pixi.js'
import { gsap } from 'gsap';

export class Symbol extends PIXI.Sprite{

    constructor(texture:any){
        super(texture);
    }

    public moveSymbolOut(currentSymbolDelay:number):void{
        gsap.to(this,{y:window.outerHeight*2, duration: 0.3, delay:currentSymbolDelay, onComplete:()=>{
            this.y = -300;
        }});
    }

    public moveSymbolIn(currentSymbolDelay:number, xPosition: number, yPosition:number){
        gsap.to(this, {x:xPosition, y:yPosition, duration: 0.3, delay: currentSymbolDelay, ease:'back.out(1.5)'});
    }
}