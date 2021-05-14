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
export default class NewClass extends cc.Component {



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    @property(cc.Animation)
    anim: cc.Animation=null;
    played: boolean = false;
    start () {
        this.Button_Init();
        // this.anim = this.getComponent(cc.Animation);
    }
    update(dt){
        if(this.played){
            if(this.anim.getAnimationState("Change Scene").isPlaying == false) 
                cc.director.loadScene("Test level");
        }
    }
    Button_Init(){
        let button = new cc.Component.EventHandler();
        button.target = this.node;
        button.component = "start button";
        button.handler = "playGame";
        button.customEventData = "Pressed";
        cc.find("Canvas/Play Button").getComponent(cc.Button).clickEvents.push(button);
    }
    playGame(event, customEventData){
        this.anim.play("Change Scene");
        this.played = true;
    }
    // update (dt) {}
}
