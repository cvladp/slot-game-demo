import * as PIXI from  'pixi.js'

export class Background extends PIXI.Sprite{
    constructor(texture:any){
        super(texture);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }
}