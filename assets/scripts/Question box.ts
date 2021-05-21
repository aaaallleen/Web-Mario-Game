// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import playerData from "./Global";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    private popped: boolean = false;
    private anim: cc.Animation = null;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    }

    start () {
        this.anim = this.getComponent(cc.Animation);
    }

    update (dt) {
        if(!this.popped){
            if(this.anim.getAnimationState("Question unpop").isPlaying == false){
                this.anim.play("Question unpop");
            }
        }
        else{
            if(this.anim.getAnimationState("Question pop").isPlaying == false){
                this.anim.play("Question pop");
            }
        }
    }
    onEndContact(contact, self , other){
        if(other.node.name == "Player"){
            if(contact.getWorldManifold().normal.y < -0.9 && this.popped == false ){
                this.popped = true;
            }
        }
    }
}
