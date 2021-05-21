const {ccclass, property} = cc._decorator;

@ccclass
export default class Pirahna extends cc.Component {

    @property 
    isRisen: boolean = false;

    @property({type:cc.Node})
    player: cc.Node = null;

    isDead: boolean = false;
    moveup: boolean = true;
    finishrising: boolean = false;
    anim: cc.Animation = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    onLoad(){
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true; 
    }
    start () {
        this.anim = this.getComponent(cc.Animation); 
        // this.anim.play('Piranha flower rise');
    }
    

    update (dt) {
       if(this.isRisen == true){
            if(this.anim.getAnimationState("Piranha flower bite").isPlaying == false)
                this.anim.play("Piranha flower bite");
       }
       else{
            if(this.anim.getAnimationState("Piranha flower bite").isPlaying == false)
                this.anim.play("Piranha flower bite");
            
        }
        let pos = this.player.getPosition();
        if(pos.x+340  >= this.node.x-50 && this.finishrising == false ){
            this.finishrising = true;
            this.flowerMove();
            
        }
          
    } 
    
    flowerMove(){
        var action = cc.repeatForever(cc.sequence(cc.moveBy(2,0,64),cc.moveBy(2,0,0),cc.moveBy(2,0,-64),cc.moveBy(2,0,0)));
        this.node.runAction(action);
    }  
    
}



