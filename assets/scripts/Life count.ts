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

    start () {
        if(playerData.health > 0){
            var level = "Level " + playerData.level;
            this.scheduleOnce(function(){
                cc.director.loadScene(level);
            },3)
        }  
        else{
            this.scheduleOnce(function(){
                cc.director.loadScene("Menu");
            },3)
        }
    }

    // update (dt) {}
}
