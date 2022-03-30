
import * as PIXI from  'pixi.js'
import { Texture } from 'pixi.js';
import { Utils } from './Utils';
import { gsap, TweenLite } from 'gsap';

export class Button extends PIXI.Sprite{
    private pressedTexture;
    private hoverTexture;
    private normalTexture;
    private disableTexture;



    constructor(pressedTexture:any,hoverTexture:any,normalTexture:any,disableTexture:any){
        super(normalTexture);
        this.pressedTexture = pressedTexture;
        this.hoverTexture = hoverTexture;
        this.normalTexture = normalTexture;
        this.disableTexture = disableTexture;

        this.setupButton();
    }

    private setupButton():void{
        this.texture = this.normalTexture;
        this.interactive = true;
        this.buttonMode = true;
        this.visible = true;
        this.on('pointerdown', this.onButtonPressed.bind(this));
        this.on('pointerover', this.onButtonHover.bind(this));
        this.on('pointerout', this.onButtonOut.bind(this));
    }

    private onButtonPressed():void{
        this.texture = this.pressedTexture;
        this.interactive = false;
        gsap.delayedCall(1,this.onButtonDisable.bind(this));
    }

    private onButtonHover():void{
        this.texture = this.hoverTexture;
    }

    private onButtonOut():void{
        this.texture = this.normalTexture;
    }

    private onButtonDisable():void{
        this.texture = this.disableTexture;
    }

    public resetButton():void{
        this.onButtonOut();
        this.interactive = true;
    }





}