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

    
    @property(cc.Animation)
    anim: cc.Animation = null;

    @property({type: cc.AudioClip})
    welcomebgm: cc.AudioClip = null;
    played: boolean = false;
    onLoad () {
        cc.audioEngine.setMusicVolume(playerData.bgmvolume);
        cc.audioEngine.playMusic(this.welcomebgm, true);
    }
    update(dt){
        if(this.played){
            if(this.anim.getAnimationState("Change Scene").isPlaying == false) 
                cc.director.loadScene("Level 1");
                cc.audioEngine.pauseMusic();
        }
        cc.audioEngine.setMusicVolume(playerData.bgmvolume);
    }
    playGame(event, customEventData){
        this.anim.play("Change Scene");
        this.played = true;
    }
    Reverseplay(event, customEventData){
        this.anim.play("Change Scene");
        cc.log("Login button pushed");
        var animstate = this.anim.play("Change Scene");
        animstate.wrapMode = cc.WrapMode.Reverse;
    }
    
    // update (dt) {}
}
