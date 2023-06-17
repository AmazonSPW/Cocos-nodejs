import { IApiPlayerJoinReq, IApiPlayerJoinRes, IApiPlayerListReq, IApiPlayerListRes } from "./Api"
import { ApiMsgEnum } from "./Enum"
import { IMsgClientSync, IMsgPlayerList, IMsgServerSync } from "./Msg"

/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-16 22:50:50
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-17 10:15:49
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\Common\Model.ts
 * @Description  : 
 */
export class IModule {
    api: {
        [ApiMsgEnum.ApiPlayerJoin]: {
            req: IApiPlayerJoinReq,
            res: IApiPlayerJoinRes,
        },
        [ApiMsgEnum.ApiPlayerList]: {
            req: IApiPlayerListReq,
            res: IApiPlayerListRes,
        }
    }

    msg: {
        [ApiMsgEnum.MsgPlayerList]: IMsgPlayerList,
        [ApiMsgEnum.MsgClientSync]: IMsgClientSync,
        [ApiMsgEnum.MsgServerSync]: IMsgServerSync,
    }

}