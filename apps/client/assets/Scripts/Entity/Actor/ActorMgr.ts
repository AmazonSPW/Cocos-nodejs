/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 22:04:16
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-11 23:06:19
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Entity\Actor\ActorMgr.ts
 * @Description  : 
 */
import { _decorator, Component } from 'cc';
import { InputTypeEnum } from '../../Common';
import DataManager from '../../Global/DataManager';
const { ccclass, property } = _decorator;

@ccclass('ActorMgr')
export class ActorMgr extends Component {
    protected onLoad(): void {

    }

    protected update(dt: number): void {
        if (DataManager.Instance.jm.joyStickDir.lengthSqr() > 0) {
            const { x, y } = DataManager.Instance.jm.joyStickDir;
            DataManager.Instance.aplly({
                id: 1,
                type: InputTypeEnum.ActorMove,
                direction: {
                    x, y,
                },
                dt,
            })


            console.log(`SWP log_____________ ${JSON.stringify(DataManager.Instance.state.actors[0].position)}`);
        }
    }
}
