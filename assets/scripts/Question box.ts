// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import items from "./items"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property (cc.Prefab)
    Coin: cc.Prefab = null;

    @property (cc.Prefab)
    Mushroom: cc.Prefab = null;
    
    @property({type:cc.AudioClip})
    MushroomAppear: cc.AudioClip = null;
    
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
            if(contact.getWorldManifold().normal.y == -1 && this.popped == false ){
                this.popped = true;
                this.activateItem();
            }
        }
    }
    activateItem(){
        if(Math.random() > 0.9){
            var item = cc.instantiate(this.Mushroom);
            item.getComponent(items).init(this.node);
            cc.audioEngine.playEffect(this.MushroomAppear,false);
        }
        else{
            var item = cc.instantiate(this.Coin);
            item.getComponent(items).init(this.node);
        }
    }
}
