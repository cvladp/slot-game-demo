import * as PIXI from  'pixi.js'
import { MainStage } from './MainStage';
import { Utils } from './Utils';
import { Howl } from 'howler';
import { gsap } from 'gsap';
import { Preloader } from './Preloader';

/** 
 *    Entry point of the game
 *    Serves as the loader for game resources
 */
class EntryPoint{
    public app: PIXI.Application;
    public sounds:Howl[] = [];
    private preloader:Preloader;

	/**
	 * Constructor method, used to initialize the main pixi application
	 */
    constructor(){
        this.app = new PIXI.Application({
            backgroundColor: 0xFFFFFF, resolution: window.devicePixelRatio || 1,
        });
        this.preloader = new Preloader;
        this.app.renderer.view.style.width = window.innerWidth +'px';
        this.app.renderer.view.style.height = window.innerHeight +'px';
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.app.view);
        
    }

	/**
	 * Method used to load ressources into pixi loader
	 */
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
        this.app.loader.onStart.add(this.onLoadingStarted.bind(this));
        this.app.loader.onComplete.add(this.onAssetsLoaded.bind(this));
        this.app.loader.load();
    }

    /**
	 * Handler method for starting ressource loading event
     * Adds the preloader scene to the app
	 */
    private onLoadingStarted():void{
        this.app.stage.addChild(this.preloader);
    }

    /**
	 * Handler method for complete ressource loading event
	 */
    private onAssetsLoaded():void{
        gsap.delayedCall(3, ()=>{
            const mainStage = new MainStage(this.app, this.sounds);
            this.app.stage.removeChild(this.preloader);
            this.preloader.destroy;
        })
    }
}

const game = new EntryPoint();
game.startAppLoader();

