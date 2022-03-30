import * as PIXI from  'pixi.js';
import { Background } from './Background';
import { Button } from './Button';
import { Symbol } from "./Symbol";
import { Utils } from './Utils';
import { gsap } from 'gsap';
import { Graphics, resources } from 'pixi.js';

export class MainStage {

    private symbolsGrid:Symbol[];
    private app: PIXI.Application;
    private backGround: Background;
    private spinButton;
    private symbolsContainer: PIXI.Container;
    
    constructor(app:PIXI.Application){
        this.app = app;
        this.symbolsGrid = [];
        this.backGround = new PIXI.Sprite;
        this.spinButton = new Button;
        this.symbolsContainer = new PIXI.Container;
        this.initBackground();
        this.initGrid();
        this.initButton();
    }

    private initGrid():void{
        for(let i = 0; i < 15; i++){
            let symbolTexture = this.app.loader.resources['symbol'+(Math.floor(Math.random() * 8) + 1)].texture;
            let symbol = new Symbol(symbolTexture);
            this.symbolsGrid[i] = symbol;
            this.symbolsGrid[i].x = (i % 5) * 230 + 250;
            this.symbolsGrid[i].y = Math.floor(i / 5) * 225 + 170;
            this.symbolsContainer.addChild(this.symbolsGrid[i]);
            this.symbolsContainer.mask = new Graphics().beginFill(0xffffff).drawRect(this.symbolsGrid[0].x, this.symbolsGrid[0].y, symbol.width*5,symbol.height*3).endFill();
            this.app.stage.addChild(this.symbolsContainer);
        }
    }

    private initBackground():void{
        this.backGround = new Background(this.app.loader.resources[Utils.BACKGROUND].texture);
        this.app.stage.addChild(this.backGround);
    }

    private initButton():void{
        let pressedTexture = this.app.loader.resources[Utils.BUTTON_PRESSED].texture;
        let normalTexture = this.app.loader.resources[Utils.BUTTON_NORMAL].texture;
        let hoverTexture = this.app.loader.resources[Utils.BUTTON_HOVER].texture;
        let disableTexture = this.app.loader.resources[Utils.BUTTON_DISABLED].texture;
        this.spinButton = new Button(pressedTexture,hoverTexture,normalTexture,disableTexture);
        this.spinButton.x = 1450;
        this.spinButton.y = 430;
        Button.pressedButtonHandler = () =>{
            this.startSpin();
        }
        this.app.stage.addChild(this.spinButton);
    }

    private startSpin():void{
        let delay = 0;
        for(let i = this.symbolsGrid.length-1; i >= 0; i--){
            this.symbolsGrid[i].moveSymbolOut(delay);
            delay += 0.1;
        }

        gsap.delayedCall(0.7, this.insertNewSymbols.bind(this));
    }

    private insertNewSymbols():void{
        let delay = 1;
        for(let i = 0; i < this.symbolsGrid.length; i++){
            let xPos = (i % 5) * 230 + 250;
            let yPos = Math.floor(i / 5) * 225 + 170;
            this.symbolsGrid[i].moveSymbolIn(delay,xPos,yPos);
            if(i > 0 && i % 5 == 0){
                delay += 0.3
            }else{
                delay += 0.1;  
            }
        }
        gsap.delayedCall(1, this.shuffleSymbols.bind(this));
        gsap.delayedCall(3, this.enableButton.bind(this));
    }

    private enableButton():void{
        this.spinButton.enableButton();
    }

    private shuffleSymbols():void{
        this.symbolsGrid.forEach(element => {
            let randomTexture = Math.floor(Math.random() * 8) + 1;
            let symbolTexture = PIXI.Texture.from('./images/symbol_'+randomTexture+'.png');
            element.texture= symbolTexture;
            element.texture.update();
        });
    }

}