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
export default class Player extends cc.Component {
    isFaceRight: boolean = true;

    @property 
    jumpHeight: number = 5000;

    @property
    jumpTime: number = 0;

    @property
    walkLength: number = 0;
     
    @property
    speed: number = 0;

    @property
    Xmove: boolean = false;

    
    
    anim: cc.Animation=null;
    isDead: boolean = false;
    jumpable: boolean= true;
    rightBtn: boolean = false;
    leftBtn: boolean = false;
    onGround: boolean = true;
    keypressed: number = 0;

    onLoad(){
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
    start(){
        this.anim = this.getComponent(cc.Animation);
    }
    onKeyDown(event: cc.Event.EventKeyboard){
        if(event.keyCode == cc.macro.KEY.d){
            this.Xmove = true;
            this.isFaceRight = true;
            if(this.rightBtn == false){
                this.keypressed++;
                this.rightBtn = true;
            }
        }
        if(event.keyCode == cc.macro.KEY.a){
            this.Xmove = true; 
            this.isFaceRight = false;
            if(this.leftBtn == false){
                this.keypressed++;
                this.leftBtn = true;
            }
        }
        if(event.keyCode == cc.macro.KEY.space && this.jumpable == true){
            this.getComponent(cc.RigidBody).applyForceToCenter(cc.v2(0,this.jumpHeight),true);
        }
    }
    onKeyUp(event: cc.Event.EventKeyboard){
        if(event.keyCode == cc.macro.KEY.d){
            this.rightBtn = false;
            this.keypressed--;

            if(this.keypressed <= 0 ){
                this.Xmove = false;
                this.keypressed = 0;
            }
            else{
                this.isFaceRight = false;
            }
                 
        }
        if(event.keyCode == cc.macro.KEY.a){
            this.leftBtn = false;
            this.keypressed--;
            if(this.keypressed <= 0){
                this.Xmove = false;
                this.keypressed = 0;
            }
            else{
                this.isFaceRight = true;
            }
            
        }

    }
    update (dt) {
        if(this.isFaceRight){
            this.node.scaleX = 1
        }
        else
            this.node.scaleX = -1;

        
        if(this.anim.getAnimationState("Mario Run").isPlaying == false && this.Xmove == true){
            this.anim.play("Mario Run");
        }

        if(this.Xmove == false){
            this.anim.play("Mario Idle");
        }
        if(this.Xmove){
            this.node.x += this.speed * dt * this.node.scaleX;
        }
        
    }
   
    onBeginContact(contact, self, other){
        if(contact.getWorldManifold().normal.y < -0.7 ){
            this.jumpable = true;
        }
    }
    onEndContact(contact, self, other){
        if(contact.getWorldManifold().normal.y < -0.8 )
            this.jumpable = false;
    }
    
}
