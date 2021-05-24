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
export default class items extends cc.Component {

    isActive: boolean = false;
    speed: number = 0;
    // LIFE-CYCLE CALLBACKS:
    @property({type:cc.AudioClip})
    coinEffect:cc.AudioClip = null;
    @property({type:cc.AudioClip})
    MushroomEffect:cc.AudioClip = null;
    private playervel: number = 0;
    public init(node: cc.Node){
        this.setInitPos(node);

    }

    private setInitPos(node: cc.Node){

        this.node.parent = node;
        
        // this.node.position = this.node.position.add(node.position);

        if(this.node.name == 'Coin'){
            this.node.position = cc.v2(0, 17);
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 160);
            playerData.coin ++;
            cc.audioEngine.playEffect(this.coinEffect, false);

            this.scheduleOnce(function(){
                this.node.destroy();
            },0.4)
        }
        else if(this.node.name == 'Mushroom'){
            this.node.position = cc.v2(0, 19);
            this.speed = 70;
        }
    }
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        // this.node.active = true;
    }

    start () {
    }

    update (dt) {
        this.node.x += this.speed * dt;
    } 
    onBeginContact(contact, self, other){
        if(other.node.name == "Player" && self.node.name == "Coin"){
            this.playervel = other.getComponent(cc.RigidBody).linearVelocity;
            this.node.destroy();
            cc.audioEngine.playEffect(this.coinEffect, false); 
        }
        else if(other.node.name == "Lower bound"){
            self.node.destroy();
        }
        else{
            this.speed *= -1;
        }
    }
    onEndContact(contact, self, other){
        if(other.node.name == "Player"&& self.node.name == "Coin"){
            other.getComponent(cc.RigidBody).linearVelocity = this.playervel;
        }
        
    }
}
