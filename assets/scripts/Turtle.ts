const {ccclass, property} = cc._decorator;

@ccclass
export default class Turtle extends cc.Component {

    @property
    speed: number = 0;

    @property
    walktime: number = 0;

    isDead: boolean = false;
    isFaceLeft: boolean = true;
    anim: cc.Animation = null;
    attack: number = 0;
    timer: number = 0;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    onLoad(){
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true; 
    }
    start () {
        this.anim = this.getComponent(cc.Animation);
        this.timer = 0.0;
    }

    update (dt) {
       
        if(this.isDead == false){
            this.timer+=dt;
            if(this.timer >= 3.0){
                this.isFaceLeft = !this.isFaceLeft;
                this.timer = 0.0
            }
            if(this.anim.getAnimationState("Turtle Alive").isPlaying == false)
                this.anim.play("Turtle Alive");
            this.node.x +=  this.speed * dt * this.node.scaleX;
        }
        else{
            if(this.attack >= 2){
                if(this.anim.getAnimationState("Turtle attack").isPlaying == false)
                    this.anim.play("Turtle attack");
                this.speed = (this.isFaceLeft)?200:-200;
                this.node.scaleX = (this.isFaceLeft)?1:-1;
                this.node.x += this.speed * dt * this.node.scaleX; 
            }
            else{
                if(this.anim.getAnimationState("Turtle Dead").isPlaying == false)
                    this.anim.play("Turtle Dead");
            }
        }
        
        if(this.isFaceLeft){
            this.node.scaleX = 1;
        }
        else{
            this.node.scaleX = -1;
        }
        
        
    }
    
    onBeginContact(contact, self, other){
        if(other.node.name == "Player"){
            cc.log(this.speed);
            if(contact.getWorldManifold().normal.y > 0.8 ){
                this.isDead = true;
                if(this.attack<2){
                    this.attack++;
                }
                    else{
                    this.attack = 1;
                }
            }
        }
        else{
            if(contact.getWorldManifold().normal.x > 0.8 || contact.getWorldManifold().normal.x < -0.8){
                this.isFaceLeft = !this.isFaceLeft;

                cc.log("collision with non player");
            }
        }
        
    }
    
}
