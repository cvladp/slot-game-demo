import * as PIXI from  'pixi.js'
import { gsap } from 'gsap';
import { Howl } from 'howler';

export class Symbol extends PIXI.Sprite{

    constructor(texture:any){
        super(texture);
    }

    public moveSymbolOut(currentSymbolDelay:number):void{
        gsap.to(this,{y:window.outerHeight*2, duration: 0.3, delay:currentSymbolDelay, onComplete:()=>{
            this.y = -300;
        }});
    }

    public moveSymbolIn(currentSymbolDelay:number, xPosition: number, yPosition:number, sound:Howl){
        gsap.to(this, {x:xPosition, y:yPosition, duration: 0.3, delay: currentSymbolDelay, ease:'back.out(0.5)', onComplete:()=>{
            sound.play();
        }});
    }
}