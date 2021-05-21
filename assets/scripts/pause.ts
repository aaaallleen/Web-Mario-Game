// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const {ccclass, property} = cc._decorator;

@ccclass
export  class pause extends cc.Component {


    // LIFE-CYCLE CALLBACKS:
    
    
   paused: boolean = false;

    start () {
        this.paused = false;
        this.node.active = true;
    }
    popup(){
        cc.log("pause");
        if(!this.paused){
            this.scheduleOnce(function(){
               cc.director.pause(); 
               cc.audioEngine.pauseMusic();
               this.paused = true;
            },0.4);
            this.node.active = true;
            this.node.opacity = 0;
            this.node.scale = 0.2;
            cc.tween(this.node)
            .to(0.5,{scale: 1, opacity: 255}, {easing:"quartInOut"})
            .start();
        }
        else{
            this.closePopUp();
            cc.director.resume();  
        }
    }
    closePopUp(){
        cc.tween(this.node)
        .to(0.5,{scale: 0.2, opacity: 0}, {easing:"quartInOut"})
        .call(()=>{this.node.active = false;})
        .start();
        this.paused = false;
        cc.audioEngine.resumeMusic();
    }
    
    // update (dt) {}
}