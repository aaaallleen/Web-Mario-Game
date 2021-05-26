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

    // onLoad () {}
    popUp : cc.Node = null;
    popUpOpen : boolean = false;
    start () {
        this.popUp = cc.find("Canvas/Login/Login popup");
        this.popUp.active = false;
    }
    openPopUp(){
        if(this.popUpOpen == false && playerData.popup == false){
            playerData.popup = true;
            this.popUpOpen = true;
            this.popUp.active = true;
            this.popUp.opacity = 0;
            this.popUp.scale = 0.2;
            cc.tween(this.popUp)
            .to(0.5,{scale: 3, opacity: 255}, {easing:"quartInOut"})
            .start();
        }
    }
    closePopup(){
        playerData.popup = false;
        this.popUpOpen = false;
        cc.tween(this.popUp)
        .to(0.5,{scale: 0.2, opacity: 0}, {easing:"quartInOut"})
        .call(()=>{this.popUp.active = false;})
        .start();
    }
        
    
    // update (dt) {}
}
