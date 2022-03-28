 import * as PIXI from  'pixi.js'

class EntryPoint{
    constructor(){
        const app = new PIXI.Application({
            width: 800, height: 600, backgroundColor: 0x93FF, resolution: window.devicePixelRatio || 1,
        });
        document.body.appendChild(app.view);
    }
}
console.log("hs1y33ys");

const app = new EntryPoint();

