import * as PIXI from  'pixi.js'
import { gsap } from 'gsap';
import { Howl } from 'howler';

/** 
 *    Symbol class
 *    Serves as pixi Sprite for the symbols
 */
export class Symbol extends PIXI.Sprite{

    constructor(texture:any){
        super(texture);
    }

    /** 
     *    Method used to animate symbols out of the screen
     */
    public moveSymbolOut(currentSymbolDelay:number):void{
        gsap.to(this,{y:window.outerHeight*2, duration: 0.3, delay:currentSymbolDelay, onComplete:()=>{
            this.y = -300;
        }});
    }

    /** 
     *    Method used to animate symbols into the scene
     */
    public moveSymbolIn(currentSymbolDelay:number, xPosition: number, yPosition:number, sound:Howl){
        gsap.to(this, {x:xPosition, y:yPosition, duration: 0.3, delay: currentSymbolDelay, ease:'back.out(0.5)', onComplete:()=>{
            sound.play();
        }});
    }
}