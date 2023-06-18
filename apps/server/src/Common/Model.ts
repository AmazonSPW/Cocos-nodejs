/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-16 22:50:50
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-18 14:17:36
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\server\src\Common\Model.ts
 * @Description  : 
 */
import {
    IApiGameStartReq,
    IApiGameStartRes,
    IApiPlayerJoinReq,
    IApiPlayerJoinRes,
    IApiPlayerListReq,
    IApiPlayerListRes,
    IApiRoomCreateReq,
    IApiRoomCreateRes,
    IApiRoomJoinReq,
    IApiRoomJoinRes,
    IApiRoomLeaveReq,
    IApiRoomLeaveRes,
    IApiRoomListReq,
    IApiRoomListRes
} from "./Api"
import { ApiMsgEnum } from "./Enum"
import { IMsgClientSync, IMsgGameStart, IMsgPlayerList, IMsgRoom, IMsgRoomList, IMsgServerSync } from "./Msg"

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
        [ApiMsgEnum.ApiRoomLeave]: {
            req: IApiRoomLeaveReq,
            res: IApiRoomLeaveRes,
        },
        [ApiMsgEnum.ApiGameStart]: {
            req: IApiGameStartReq,
            res: IApiGameStartRes,
        },
    }

    msg: {
        [ApiMsgEnum.MsgPlayerList]: IMsgPlayerList,
        [ApiMsgEnum.MsgClientSync]: IMsgClientSync,
        [ApiMsgEnum.MsgServerSync]: IMsgServerSync,
        [ApiMsgEnum.MsgGameStart]: IMsgGameStart,
        [ApiMsgEnum.MsgRoomList]: IMsgRoomList,
        [ApiMsgEnum.MsgRoom]: IMsgRoom,
    }

}