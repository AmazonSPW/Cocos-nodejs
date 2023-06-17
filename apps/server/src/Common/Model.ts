/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-16 22:50:50
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-17 22:00:29
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Common\Model.ts
 * @Description  : 
 */
import {
    IApiPlayerJoinReq,
    IApiPlayerJoinRes,
    IApiPlayerListReq,
    IApiPlayerListRes,
    IApiRoomCreateReq,
    IApiRoomCreateRes,
    IApiRoomJoinReq,
    IApiRoomJoinRes,
    IApiRoomListReq,
    IApiRoomListRes
} from "./Api"
import { ApiMsgEnum } from "./Enum"
import { IMsgClientSync, IMsgPlayerList, IMsgRoom, IMsgRoomList, IMsgServerSync } from "./Msg"

/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-16 22:50:50
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-17 11:10:30
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Common\Model.ts
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
        },
        [ApiMsgEnum.ApiRoomCreate]: {
            req: IApiRoomCreateReq,
            res: IApiRoomCreateRes,
        },
        [ApiMsgEnum.ApiRoomList]: {
            req: IApiRoomListReq,
            res: IApiRoomListRes,
        },
        [ApiMsgEnum.ApiRoomJoin]: {
            req: IApiRoomJoinReq,
            res: IApiRoomJoinRes,
        },
    }

    msg: {
        [ApiMsgEnum.MsgPlayerList]: IMsgPlayerList,
        [ApiMsgEnum.MsgClientSync]: IMsgClientSync,
        [ApiMsgEnum.MsgServerSync]: IMsgServerSync,
        [ApiMsgEnum.MsgRoomList]: IMsgRoomList,
        [ApiMsgEnum.MsgRoom]: IMsgRoom,
    }

}