import * as PIXI from  'pixi.js'
import { Symbol } from "./Symbol"

class EntryPoint{
    public app: PIXI.Application;
    private symbolsGrid:Symbol[];  // TO BE MOVED IN A GRID CLASS

    constructor(){
        this.app = new PIXI.Application({
            width: window.innerWidth , height: window.innerHeight, backgroundColor: 0x93FF, resolution: window.devicePixelRatio || 1,
        });
        this.symbolsGrid = []
        document.body.appendChild(this.app.view);
    }

    public startApp():void{
        for(let i = 1; i < 9; i++){
            this.app.loader.add('symbol'+i,'./images/symbol_'+i+'.png');
        }
        this.app.loader.onComplete.add(this.onAssetsLoaded.bind(this));
        this.app.loader.load();
    }


    private onAssetsLoaded():void{
        for(let i = 0; i < 15; i++){
            let symbolTexture = this.app.loader.resources['symbol'+(Math.floor(Math.random() * 8) + 1)].texture;
            let symbol = new Symbol(symbolTexture);
            symbol.anchor.set(0.5);
            symbol.x = (i % 5) * 230 + 350;
            symbol.y = Math.floor(i / 5) * 225 + 250;
            this.symbolsGrid[i] = symbol;
        }
        for(let i = 0; i < this.symbolsGrid.length; i++){
            this.app.stage.addChild(this.symbolsGrid[i]);
        }
    }
}

const game = new EntryPoint();
game.startApp();

