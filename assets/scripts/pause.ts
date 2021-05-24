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
    @property(cc.Animation)
    Anim: cc.Animation = null;

    private enter: boolean = false;
    popUp: cc.Node = null;
    arrow: cc.Node = null;
    paused: boolean = false;
    private resume: boolean = true;
    private restart: boolean = false
    start () {
        this.popUp = cc.find("Canvas/Main Camera/Pause button/pause");
        this.paused = false;
        this.node.active = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.arrow =  cc.find("Canvas/Main Camera/Pause button/pause/arrow");
    }
    popup(){
        cc.log("pause");
        if(!this.paused){
            this.scheduleOnce(function(){
               cc.director.pause(); 
               cc.audioEngine.pauseMusic();
               this.paused = true;
            },0.5);
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
    onKeyUp( event:cc.Event.EventKeyboard){
        if(event.keyCode == cc.macro.KEY.w){
            this.arrow.setPosition(cc.v2(-154, 0));
            this.resume = true;
            this.restart = false;
        }
        else if(event.keyCode == cc.macro.KEY.s){
            this.arrow.setPosition(cc.v2(-154, -64));
            this.resume = false;
            this.restart = true;
        }
        else if(event.keyCode == cc.macro.KEY.enter){
            this.enter = true;
            cc.director.resume();
            if(this.restart == true){
                cc.tween(this.popUp)
                .to(0.5,{scale: 0, opacity: 0}, {easing:"quartInOut"})
                .call(()=>{this.popUp.active = false;})
                .start();
                this.popUp.active = false;
                this.scheduleOnce(function(){
                    cc.director.loadScene("Menu");
                    this.enter = false;
                }, 1);
            }
            else{
                cc.tween(this.popUp)
                .to(0.5,{scale: 0.2, opacity: 0}, {easing:"quartInOut"})
                .call(()=>{this.popUp.active = false;})
                .start();
                this.paused = false;
                cc.audioEngine.resumeMusic();
            }
        }
    }

    
    update (dt) {
        if(this.enter == true && this.restart == true && this.Anim.getAnimationState("Change Scene").isPlaying == false ){
            cc.log("pussy")
            this.Anim.play("Change Scene");
        }
        
    }
}