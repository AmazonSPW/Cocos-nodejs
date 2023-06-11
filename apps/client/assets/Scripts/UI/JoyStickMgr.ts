/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 20:25:39
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-11 23:05:53
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\UI\JoyStickMgr.ts
 * @Description  : 
 */
import { _decorator, Component, EventTouch, Input, input, Node, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('JoyStickMgr')
export class JoyStickMgr extends Component {
    public joyStickDir: Vec2 = new Vec2();
    private _body: Node | null;
    private _stick: Node | null;
    private _bodyDefaulPos: Vec3;
    private _bodyRadiusSqr: number;
    private _bodyRadius: number;


    protected start() {
        this._body = this.node.getChildByName("Body");
        this._stick = this._body.getChildByName("Stick");
        this._bodyDefaulPos = this._body.position.clone();
        this._bodyRadius = this._stick.getComponent(UITransform).contentSize.x / 2;
        this._bodyRadiusSqr = this._bodyRadius ** 2;

        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    private onTouchStart = (e: EventTouch) => {
        this._body.setPosition(e.getUILocation().x, e.getUILocation().y);
    }

    private onTouchMove = (e: EventTouch) => {
        const touchPos = e.getUILocation();
        Vec2.subtract(touchPos, touchPos, new Vec2(this._body.getPosition().x, this._body.getPosition().y));

        if (touchPos.lengthSqr() > this._bodyRadiusSqr) {
            touchPos.multiplyScalar(this._bodyRadius / touchPos.length());
        }
        this._stick.setPosition(touchPos.x, touchPos.y);
        this.joyStickDir.set(touchPos.x, touchPos.y).normalize();
    }

    private onTouchEnd = (e: EventTouch) => {
        this._stick.setPosition(Vec3.ZERO);
        this._body.setPosition(this._bodyDefaulPos);
        this.joyStickDir.set(0, 0);
    }
}

