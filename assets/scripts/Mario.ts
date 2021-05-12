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
    isFaceRight: boolean = true;

    @property 
    jumpHeight: number = 0;

    @property
    jumpTime: number = 0;

    @property
    walkLength: number = 0;
     
    @property
    speed: number = 0;

    @property
    onGround: boolean = true;
    
    @property
    isDead: boolean = false;

    // LIFE-CYCLE CALLBACKS:
    @property
    movement: number = 0;
    // idle:0, right, left:1, jump: 2;

    anim: cc.Animation=null;
    // onLoad () {}

    start () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.anim = this.getComponent(cc.Animation);
    }
    onKeyDown(event: cc.Event.EventKeyboard){
        if(event.keyCode == cc.macro.KEY.d){
            this.movement = 1;
            this.isFaceRight = true;
        }
        if(event.keyCode == cc.macro.KEY.a){
            this.movement = 1; 
            this.isFaceRight = false;
        }
        
    }
    onKeyUp(event: cc.Event.EventKeyboard){
        if(event.keyCode == cc.macro.KEY.d){
            this.movement = 0;
        }
        if(event.keyCode == cc.macro.KEY.a){
            this.movement = 0;
        }

    }
    update (dt) {
        if(this.isFaceRight){
            this.node.scaleX = 1
        }
        else
            this.node.scaleX = -1;
        if(this.anim.getAnimationState("Run").isPlaying == false && this.movement == 1){
            this.anim.play("Run");
        }
        if(this.movement == 0){
            this.anim.play("Idle");
        }
        
    }
}
