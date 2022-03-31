import * as PIXI from  'pixi.js'
import { gsap } from 'gsap';
import { Howl } from 'howler';

/** 
 *    Button class
 *    Serves as the container of the spin button
 */
export class Button extends PIXI.Container{
    private pressedTexture;
    private hoverTexture;
    private normalTexture;
    private disableTexture;

    private buttonSprite: PIXI.Sprite;
    private buttonText: PIXI.Text;
    private sound;
    public static pressedButtonHandler:Function;

    /** 
     *    Constructor method for spin button class
     *    Initializes spin button sprite and spin button text
     */
    constructor(pressedTexture?:any,hoverTexture?:any,normalTexture?:any,disableTexture?:any,sound?:Howl){
        super();
        this.sound = sound;
        this.buttonSprite = new PIXI.Sprite;
        this.buttonText = new PIXI.Text('SPIN');
        this.pressedTexture = pressedTexture;
        this.hoverTexture = hoverTexture;
        this.normalTexture = normalTexture;
        this.disableTexture = disableTexture;

        this.setupButton();
    }

    /** 
     *    Method used to set events handlers for button states
     */
    private setupButton():void{
        this.buttonSprite.texture = this.normalTexture;
        this.interactive = true;
        this.buttonMode = true;
        this.visible = true;
        this.on('pointerdown', this.onButtonPressed.bind(this));
        this.on('pointerover', this.onButtonHover.bind(this));
        this.on('pointerout', this.onButtonOut.bind(this));
        this.addChild(this.buttonSprite);
        this.setButtonText();
    }

    /** 
     *    Method used to set button text and style it
     */
    private setButtonText():void{
        this.buttonText.x = this.x+45;
        this.buttonText.y = this.y+30;

        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'],
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: 'round',
        });
        this.buttonText.style = style;
        this.addChild(this.buttonText);
    }

    /** 
     *   Handler for button pressed state
     */
    private onButtonPressed():void{
        this.buttonSprite.texture = this.pressedTexture;
        this.interactive = false;
        this.sound?.play();
        gsap.to(this,{y:this.y+5, duration: 0.2, yoyo:true, repeat: 1});

        gsap.delayedCall(0.2,this.onButtonDisable.bind(this));
        Button.pressedButtonHandler();
    }

    /** 
     *   Handler for button hover state
     */
    private onButtonHover():void{
        this.buttonSprite.texture = this.hoverTexture;
    }

    /** 
     *   Handler for pointer out of the button state
     */
    private onButtonOut():void{
        this.buttonSprite.texture = this.normalTexture;
    }

    /** 
     *   Handler for button disabled state
     */
    private onButtonDisable():void{
        this.buttonSprite.texture = this.disableTexture;
    }

    /** 
     *   Method used to enable the button functionality
     */
    public enableButton():void{
        this.buttonSprite.texture = this.normalTexture;
        this.interactive = true;
    }





}