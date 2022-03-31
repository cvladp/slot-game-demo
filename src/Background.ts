import * as PIXI from  'pixi.js'

/** 
 *    Background class
 *    Serves as the main background of the game
 */
export class Background extends PIXI.Sprite{
    constructor(texture:any){
        super(texture);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }
}