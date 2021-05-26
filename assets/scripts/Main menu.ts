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
    private fpscounter: number = 0;
    setFps : boolean = true;
    @property({type: cc.AudioClip})
    welcomebgm: cc.AudioClip = null;
    played: boolean = false;
    levelopen: boolean = false;
    levelPopup: cc.Node = null;
    onLoad () {
        this.levelPopup = cc.find("Canvas/Level/Level popup");
        cc.audioEngine.setMusicVolume(playerData.bgmvolume);
        cc.audioEngine.playMusic(this.welcomebgm, true);
        this.scheduleOnce(function(){
            playerData.fps = this.fpscounter;
            this.setFps = false;
            cc.log(playerData.fps);
        },1);
    }
    update(dt){
        if(this.setFps){
            this.fpscounter++;
        }
        if(this.played){
            if(this.anim.getAnimationState("Change Scene").isPlaying == false){
                var level = "Level " + playerData.level;
                cc.log(level);
                cc.director.loadScene(level);
                cc.audioEngine.pauseMusic();
            }     
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
    openLevel(){
        if(!this.levelopen && playerData.popup == false){
            playerData.popup = true;
            this.levelopen = true;
            this.levelPopup.active = true;
            this.levelPopup.opacity = 0;
            this.levelPopup.scale = 0.2;
            cc.tween(this.levelPopup)
            .to(0.5,{scale: 6, opacity: 255}, {easing:"quartInOut"})
            .start();
        }
    }
    closeLevel(){
        playerData.popup = false;
        cc.tween(this.levelPopup)
        .to(0.5,{scale: 0.2, opacity: 0}, {easing:"quartInOut"})
        .call(()=>{this.levelPopup.active = false;})
        .start();
        this.levelopen = false;
    }
    setlevel1(){
        playerData.level = 1;
        this.closeLevel();
    }
    setlevel2(){
        playerData.level = 2;
        this.closeLevel();
    }

    // update (dt) {}
}
