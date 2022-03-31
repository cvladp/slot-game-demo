import * as PIXI from  'pixi.js'
import { MainStage } from './MainStage';
import { Utils } from './Utils';
import {Howl, Howler} from 'howler';


class EntryPoint{
    public app: PIXI.Application;
    public sounds:Howl[] = [];


    constructor(){
        this.app = new PIXI.Application({
            width: window.innerWidth , height: window.innerHeight, backgroundColor: 0x93FF, resolution: window.devicePixelRatio || 1,
        });
        document.body.appendChild(this.app.view);
        
    }

    public startAppLoader():void{
        for(let i = 1; i < 9; i++){
            this.app.loader.add(Utils.SYMBOL_NAME+i,'public/images/symbol_'+i+'.png');
        }

        for(let i = 1; i < 6; i++){
            this.sounds[i-1] = new Howl({src: 'public/sounds/Reel_Stop_'+i+'.mp3'});
        }
        this.sounds[this.sounds.length] = new Howl({src: 'public/sounds/Start_Button.mp3'})
        this.app.loader.add(Utils.BACKGROUND, 'public/images/background.jpg');
        this.app.loader.add(Utils.BUTTON_DISABLED, 'public/buttons/btn_spin_disabled.png');
        this.app.loader.add(Utils.BUTTON_HOVER, 'public/buttons/btn_spin_hover.png');
        this.app.loader.add(Utils.BUTTON_NORMAL, 'public/buttons/btn_spin_normal.png');
        this.app.loader.add(Utils.BUTTON_PRESSED, 'public/buttons/btn_spin_pressed.png');
        this.app.loader.onComplete.add(this.onAssetsLoaded.bind(this));
        this.app.loader.load();
    }


    private onAssetsLoaded():void{
        const mainStage = new MainStage(this.app, this.sounds);
    }
}

const game = new EntryPoint();
game.startAppLoader();

