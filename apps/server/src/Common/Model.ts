import { IApiPlayerJoinReq, IApiPlayerJoinRes } from "./Api"
import { ApiMsgEnum } from "./Enum"
import { IMsgClientSync, IMsgServerSync } from "./Msg"

/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-16 22:50:50
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-16 23:03:01
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\Common\Model.ts
 * @Description  : 
 */
export class IModule {
    api: {
        [ApiMsgEnum.ApiPlayerJoin]: {
            req: IApiPlayerJoinReq,
            res: IApiPlayerJoinRes,
        }
    }

    msg: {
        [ApiMsgEnum.MsgClientSync]: IMsgClientSync,
        [ApiMsgEnum.MsgServerSync]: IMsgServerSync,
    }

}