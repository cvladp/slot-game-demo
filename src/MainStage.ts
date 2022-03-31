import * as PIXI from  'pixi.js';
import { Background } from './Background';
import { Button } from './Button';
import { Symbol } from "./Symbol";
import { Utils } from './Utils';
import { gsap } from 'gsap';
import { Graphics } from 'pixi.js';
import { Howl } from 'howler';


/** 
 *    MainStage class
 *    Serves as the main logic class of the game
 */
export class MainStage {

    private symbolsGrid:Symbol[];
    private app: PIXI.Application;
    private backGround: Background;
    private spinButton: Button;
    private symbolsContainer: PIXI.Container;
    private sounds:Howl[];
    

    /** 
     *    Constructor method for main stage
     *    Initializes the elements of the stage
     */
    constructor(app:PIXI.Application, sounds:Howl[]){
        this.app = app;
        this.sounds = sounds;
        this.symbolsGrid = [];
        this.backGround = new PIXI.Sprite;
        this.spinButton = new Button;
        this.symbolsContainer = new PIXI.Container;
        this.initBackground();
        this.initGrid();
        this.initButton();
    }

    /** 
     *    Initializer method for the 5x3 symbols grid
     */
    private initGrid():void{
        for(let i = 0; i < 15; i++){
            let symbolTexture = this.app.loader.resources['symbol'+(Math.floor(Math.random() * 8) + 1)].texture;
            let symbol = new Symbol(symbolTexture);
            this.symbolsGrid[i] = symbol;
            this.symbolsGrid[i].x = Math.floor(i / 3) * 239 + 150;
            this.symbolsGrid[i].y = (i % 3) * 230 + 170;
            this.symbolsContainer.addChild(this.symbolsGrid[i]);
            this.symbolsContainer.mask = new Graphics().beginFill(0xffffff).drawRect(this.symbolsGrid[0].x-1, this.symbolsGrid[0].y-1, symbol.width*5+25,symbol.height*3+25).endFill();
            this.app.stage.addChild(this.symbolsContainer);
        }
    }

    /** 
     *    Initializer method for the background
     */
    private initBackground():void{
        this.backGround = new Background(this.app.loader.resources[Utils.BACKGROUND].texture);
        this.app.stage.addChild(this.backGround);
    }

    /** 
     *    Initializer method for the spin button
     */
    private initButton():void{
        let pressedTexture = this.app.loader.resources[Utils.BUTTON_PRESSED].texture;
        let normalTexture = this.app.loader.resources[Utils.BUTTON_NORMAL].texture;
        let hoverTexture = this.app.loader.resources[Utils.BUTTON_HOVER].texture;
        let disableTexture = this.app.loader.resources[Utils.BUTTON_DISABLED].texture;
        this.spinButton = new Button(pressedTexture,hoverTexture,normalTexture,disableTexture, this.sounds[this.sounds.length-1]);
        this.spinButton.x = 1450;
        this.spinButton.y = 430;
        Button.pressedButtonHandler = () =>{
            this.startSpin();
        }
        this.app.stage.addChild(this.spinButton);
    }

    /** 
     *    Method used to start symbols animation out of the screen
     */
    private startSpin():void{
        let delay = 0;
        for(let i = this.symbolsGrid.length-1; i >= 0; i--){
            this.symbolsGrid[i].moveSymbolOut(delay);
            delay += 0.1;
        }
        gsap.delayedCall(0.7, this.insertNewSymbols.bind(this));
    }

    /** 
     *    Method used to insert symbols into the screen
     */
    private insertNewSymbols():void{
        let delay = 1;
        let soundsCounter = 0;
        for(let i = 0; i < this.symbolsGrid.length; i++){
            if(i > 0 && i % 3 == 0){
                soundsCounter++;
            }
            let xPos = Math.floor(i / 3) * 239 + 150;
            let yPos = (i % 3) * 230 + 170;
            this.symbolsGrid[i].moveSymbolIn(delay,xPos,yPos,this.sounds[soundsCounter]);
            if(i > 0 && i % 3 == 0){
                delay += 0.2
            }else{
                delay += 0.1;  
            }
        }
        gsap.delayedCall(1, this.shuffleSymbols.bind(this));
        gsap.delayedCall(3, this.enableButton.bind(this));
    }

    /** 
     *    Method used to call enable method of the button class
     */
    private enableButton():void{
        this.spinButton.enableButton();
    }

    /** 
     *    Method used to generate random symbols
     */
    private shuffleSymbols():void{
        this.symbolsGrid.forEach(element => {
            let randomTexture = Math.floor(Math.random() * 8) + 1;
            let symbolTexture = PIXI.Texture.from('public/images/symbol_'+randomTexture+'.png');
            element.texture= symbolTexture;
            element.texture.update();
        });
    }

}