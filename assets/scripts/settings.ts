// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import playerData = require("./Global");

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    // LIFE-CYCLE CALLBACKS:
    
    @property({type: cc.Slider})
    bgmslider: cc.Slider = null;

    @property({type: cc.Slider})
    soundeffectslider: cc.Slider = null;
    
    popupOpen: boolean = false;

    // start () {
        
    // }
    popup(){
        if(!this.popupOpen && playerData.popup == false){
            playerData.popup = true;
            this.soundeffectslider.progress = playerData.effectvolume;
            this.bgmslider.progress = playerData.bgmvolume;
            this.node.active = true;
            this.node.opacity = 0;
            this.node.scale = 0.2;
            cc.tween(this.node)
            .to(0.5,{scale: 1, opacity: 255}, {easing:"quartInOut"})
            .start();
            this.popupOpen = true;

        }
        
        
    }
    closePopUp(){
        playerData.popup = false;
        cc.tween(this.node)
        .to(0.5,{scale: 0.2, opacity: 0}, {easing:"quartInOut"})
        .call(()=>{this.node.active = false;})
        .start();
        this.popupOpen = false;
    }

    seteffectVolume(){
        playerData.effectvolume = this.soundeffectslider.progress
    }
    setbgmVolume(){
        playerData.bgmvolume = this.bgmslider.progress;
    }
}
