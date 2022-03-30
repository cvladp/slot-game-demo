import * as PIXI from  'pixi.js';
import { Background } from './Background';
import { Button } from './Button';
import { Symbol } from "./Symbol";
import { Utils } from './Utils';

export class MainStage {

    private symbolsGrid:Symbol[];
    private app: PIXI.Application;
    private backGround: Background;
    private spinButton;
    

    constructor(app:PIXI.Application){
        this.app = app;
        this.symbolsGrid = [];
        this.backGround = new PIXI.Sprite;
        this.spinButton = new PIXI.Sprite;
        this.initBackground();
        this.initGrid();
        this.initButton();
    }


    private initGrid():void{
        for(let i = 0; i < 15; i++){
            let symbolTexture = this.app.loader.resources['symbol'+(Math.floor(Math.random() * 8) + 1)].texture;
            let symbol = new Symbol(symbolTexture);
            symbol.anchor.set(0.5);
            symbol.x = (i % 5) * 230 + 350;
            symbol.y = Math.floor(i / 5) * 225 + 250;
            this.symbolsGrid[i] = symbol;
            this.app.stage.addChild(this.symbolsGrid[i]);
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
        this.app.stage.addChild(this.spinButton);
    }

}