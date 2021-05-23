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


    @property({type: cc.AudioClip})
    jumpEffect: cc.AudioClip = null;
    @property({type: cc.AudioClip})
    powerdown: cc.AudioClip = null;
    @property({type: cc.AudioClip})
    powerup: cc.AudioClip = null;
    @property({type: cc.AudioClip})
    loselife: cc.AudioClip = null;
    @property({type: cc.AudioClip})
    scene1bgm: cc.AudioClip = null;
    @property({type: cc.AudioClip})
    scene2bgm: cc.AudioClip = null;

    private anim: cc.Animation=null;
    private attacked: boolean = false;
    private isDead: boolean = false;
    private takeAttack: boolean = false;
    private jumpable: boolean= true;
    private rightBtn: boolean = false;
    private leftBtn: boolean = false;
    private space: boolean = false;
    private keypressed: number = 0;
    private camfollow: boolean = false;
    private lowerbound: cc.Node = null;
    private scrollable: boolean = true;
    private playerspeed: number = 0;
    
    camera: cc.Node = null;

    onLoad(){
        this.lowerbound = cc.find("Canvas/Lower bound");
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.camera = cc.find("Canvas/Main Camera");
        if(playerData.level == 1)
            cc.audioEngine.playMusic(this.scene1bgm, true);
        else
            cc.audioEngine.playMusic(this.scene2bgm, true);
    }
    start(){
        this.lowerbound.active = true;
        this.anim = this.getComponent(cc.Animation);
        cc.audioEngine.setEffectsVolume(playerData.effectvolume);
        cc.audioEngine.setMusicVolume(playerData.bgmvolume);
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
        if(event.keyCode == cc.macro.KEY.space){
            this.space = true;
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
        if(event.keyCode == cc.macro.KEY.space){
            this.space = false;
            this.jumpable = false;
        }
    }
    update (dt) {
    
        cc.audioEngine.setEffectsVolume(playerData.effectvolume);
        cc.audioEngine.setMusicVolume(playerData.bgmvolume);
       
        if(this.isFaceRight){
            this.node.scaleX = 1
        }
        else
            this.node.scaleX = -1;

        
        if(this.anim.getAnimationState("Mario Run").isPlaying == false && this.Xmove == true){
            this.anim.play("Mario Run");
        }

        if(this.Xmove == false && this.takeAttack == false){
            this.anim.play("Mario Idle");
        }
        if(this.takeAttack == true && this.anim.getAnimationState("Mario die").isPlaying == false ){
            this.anim.play("Mario die");
        }
        if(this.Xmove){
            this.node.x += this.speed * dt * this.node.scaleX;
            if(this.node.x >= -240  && this.scrollable == true){
                this.camfollow = true;
            }
            else{
                this.camfollow = false;
            }
        }
        if(this.space == true && this.jumpable == true){
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, this.jumpHeight);
            cc.audioEngine.playEffect(this.jumpEffect, false);
            this.jumpable = false;
        }
        if(this.camfollow) {
            let curposition = this.node.getPosition();
            curposition.y = 0;
            curposition.x += 240;
            this.camera.setPosition(curposition);
        }
        
        
    }
   
    onBeginContact(contact, self, other){
        if(contact.getWorldManifold().normal.y <= -0.8 ){
            this.jumpable = true;
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        }
        if(other.node.name == 'Lower bound'){
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 200);
            this.jumpable = false;
            other.node.active = false;
            cc.audioEngine.stopAll();
            this.scheduleOnce(function(){
                cc.director.loadScene("Life count");
            }, 2);
            
        }
        else if(other.node.name == 'stop scroll'){
            this.playerspeed = self.getComponent(cc.RigidBody).linearVelocity;
            this.scrollable = false;
            other.node.destroy();
        }
        else if(other.node.name == 'Turtle'  && other.getComponent('Turtle').isDead  == false){
            if(contact.getWorldManifold().normal.x == 1 || contact.getWorldManifold().normal.x == -1){
                if(this.attacked == false){
                    this.attacked = true; 
                    this.takeAttack = true;
                    cc.audioEngine.playEffect(this.powerdown,false);
                    this.getComponent(cc.RigidBody).linearVelocity = cc.v2(-200, 200);
                    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
                    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);             
                    this.getComponent(cc.PhysicsBoxCollider).size.height = 36;
                    this.getComponent(cc.PhysicsBoxCollider).size.width = 19;       
                    cc.tween(this.node)
                    .to(1,{width:19, height: 36 }, {easing:"quartInOut"})
                    .start();
                    
                    this.scheduleOnce(function(){
                        this.takeAttack = false;
                        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
                        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
                        this.isFaceRight = !this.isFaceRight;
                        this.Xmove = false
                    },0.5)
                }
                else{
                    cc.audioEngine.stopMusic();
                    cc.audioEngine.playEffect(this.loselife,false);
                    this.getComponent(cc.PhysicsBoxCollider).destroy();
                    this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 200);
                    
                }
            }
        }

        

    }
    onEndContact(contact, self, other){
        if(other.node.name == 'stop scroll'){
            self.getComponent(cc.RigidBody).linearVelocity = this.playerspeed;
        }
    }
       
}
