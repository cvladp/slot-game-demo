import * as PIXI from  'pixi.js'
import { MainStage } from './MainStage';
import { Utils } from './Utils';

class EntryPoint{
    public app: PIXI.Application;

    constructor(){
        this.app = new PIXI.Application({
            width: window.innerWidth , height: window.innerHeight, backgroundColor: 0x93FF, resolution: window.devicePixelRatio || 1,
        });
        document.body.appendChild(this.app.view);
    }

    public startAppLoader():void{
        for(let i = 1; i < 9; i++){
            this.app.loader.add(Utils.SYMBOL_NAME+i,'./images/symbol_'+i+'.png');
        }
        this.app.loader.add(Utils.BACKGROUND, './images/background.jpg');
        this.app.loader.add(Utils.BUTTON_DISABLED, 'buttons/btn_spin_disabled.png');
        this.app.loader.add(Utils.BUTTON_HOVER, 'buttons/btn_spin_hover.png');
        this.app.loader.add(Utils.BUTTON_NORMAL, 'buttons/btn_spin_normal.png');
        this.app.loader.add(Utils.BUTTON_PRESSED, 'buttons/btn_spin_pressed.png');
        this.app.loader.onComplete.add(this.onAssetsLoaded.bind(this));
        this.app.loader.load();
    }


    private onAssetsLoaded():void{
        const mainStage = new MainStage(this.app);
    }
}

const game = new EntryPoint();
game.startAppLoader();

