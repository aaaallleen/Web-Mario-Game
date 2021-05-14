const {ccclass, property} = cc._decorator;

@ccclass
export default class Pirahna extends cc.Component {

    @property 
    isRisen: boolean = false;

    isDead: boolean = false;
    
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
        this.anim.play('Piranha flower rise');
    }
    

    update (dt) {
       if(this.isRisen == true){
        if(this.anim.getAnimationState("Piranha flower bite").isPlaying == false)
            this.anim.play("Piranha flower bite");
       }
       else{
        if(!this.finishrising){
            if(this.anim.getAnimationState("Piranha flower rise").isPlaying == false)
                this.finishrising = true;
          }
        else{
            if(this.anim.getAnimationState("Piranha flower bite").isPlaying == false)
                this.anim.play("Piranha flower bite");
            }
       }
          
        }    
    }
}


