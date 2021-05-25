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

    private type: cc.RigidBodyType = null;
    

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    }
    onBeginContact(contact, self, other){
        if(other.node.name == "Player"){
            if(contact.getWorldManifold().normal.y == 1){
                this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, -100);
                this.scheduleOnce(function(){
                    this.node.destroy();
                },1)
            }
        }
    }
    // update (dt) {}
}
