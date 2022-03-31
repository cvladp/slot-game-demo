import * as PIXI from  'pixi.js'
import { gsap } from 'gsap';

/** 
 *    Preloader scene class
 *    Serves as the initial page for the game
 */
export class Preloader extends PIXI.Container{

    private loadingText: PIXI.Text;
    private textStyle: PIXI.TextStyle;

    /** 
     * Constructor method for preloader class
     * Initializes the text and text style
     */
    constructor(){
        super();
        this.loadingText = new PIXI.Text('Loading...');
        this.textStyle = new PIXI.TextStyle({
            dropShadowColor: "#0d0202",
            fill: [
                "black",
                "#5c5c5c"
            ],
            fillGradientType: 1,
            fontFamily: "Comic Sans MS",
            fontSize: 300,
            padding: 1,
            stroke: "#4ff014",
            strokeThickness: 2
        });

        this.loadingText.style = this.textStyle;
        this.loadingText.x = window.innerWidth/5;
        this.loadingText.y = window.innerHeight/4;
        this.alpha = 0;
        this.addChild(this.loadingText);
        this.animateText();
    }

    /** 
     * Method used for text animation during the preloader
     */
    private animateText(){
        gsap.to(this, {alpha: 1, yoyo:true, repeat: 10, duration: 0.5});
    }
}