/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 22:02:37
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-18 14:30:44
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Scene\BattleMgr.ts
 * @Description  : 
 */
import { _decorator, Component, instantiate, Node, Prefab, SpriteFrame } from 'cc';
import { ApiMsgEnum, EntityTypeEnum, IClientInput, IMsgClientSync, IMsgServerSync, InputTypeEnum } from '../Common';
import { ActorMgr } from '../Entity/Actor/ActorMgr';
import { BulletMgr } from '../Entity/Bullet/BulletMgr';
import { EPrefabPath, ETexTurePath, EventEnum } from '../Enum';
import DataManager from '../Global/DataManager';
import EventManager from '../Global/EventManager';
import { NetworkMgr } from '../Global/NetworkMgr';
import { ObjectPool } from '../Global/ObjectPool';
import { ResourceManager } from '../Global/ResourceManager';
import { JoyStickMgr } from '../UI/JoyStickMgr';
const { ccclass, property } = _decorator;

@ccclass('BattleMgr')
export class BattleMgr extends Component {
    public stage: Node;
    public ui: Node;
    private _useUpdate: boolean = false;
    protected onLoad(): void { }

    protected async start(): Promise<void> {
        this.clearGame();
        await Promise.all([this.connectServer(), this.loadRes()]);
        this.initGame();
    }

    private initGame() {
        DataManager.Instance.jm = this.ui.getComponentInChildren(JoyStickMgr);
        this.initMap();
        this._useUpdate = true;
        EventManager.Instance.on(EventEnum.ClientSync, this.handleClientSync, this);
        NetworkMgr.Instance.listenMsg(ApiMsgEnum.MsgServerSync, this.handlerServerSync, this);
    }

    private clearGame() {
        NetworkMgr.Instance.unListenMsg(ApiMsgEnum.MsgServerSync, this.handlerServerSync, this);
        EventManager.Instance.off(EventEnum.ClientSync, this.handleClientSync, this);
        DataManager.Instance.stage = this.stage = this.node.getChildByName("Stage");
        this.ui = this.node.getChildByName("UI");
        this.stage.destroyAllChildren();
    }

    private handlerServerSync({ inputs }: IMsgServerSync) {
        for (let input of inputs) {
            DataManager.Instance.apllyInput(input);
        }
    }

    private handleClientSync(input: IClientInput) {
        let msg: IMsgClientSync = {
            input,
            frameId: DataManager.Instance.frameID++,
        };
        NetworkMgr.Instance.sendMsg(ApiMsgEnum.MsgClientSync, msg);
    }

    private async connectServer() {
        if (!(await NetworkMgr.Instance.connect().catch(() => false))) {
            await new Promise((rs) => { setTimeout(rs, 1000) });
            await this.connectServer();
        }
    }

    protected initMap() {
        let prefab = DataManager.Instance.prefabMap.get(EntityTypeEnum.Map);
        if (!prefab) return;
        let map = instantiate(prefab);
        map.setParent(this.stage);
    }

    private async loadRes() {
        let list = [];
        for (const key in EPrefabPath) {
            let p = ResourceManager.Instance.loadRes(EPrefabPath[key], Prefab).then(e => {
                DataManager.Instance.prefabMap.set(key, e);
            });
            list.push(p);
        }

        for (const key in ETexTurePath) {
            let p = ResourceManager.Instance.loadDir(ETexTurePath[key], SpriteFrame).then(e => {
                DataManager.Instance.textureMap.set(key, e);
            });
            list.push(p);
        }
        await Promise.all(list);
    }

    protected update(dt: number): void {
        if (!this._useUpdate) return;
        this.render();
        this.tick(dt);
    }

    private tick(dt: number) {
        this.tickActor(dt);

        DataManager.Instance.apllyInput({
            type: InputTypeEnum.TimePast,
            dt,
        });
    }

    private tickActor(dt: number) {
        for (let data of DataManager.Instance.state.actors) {
            let { type, id } = data;
            let am = DataManager.Instance.actorMap.get(id);
            am.tick(dt);
        }
    }

    private render() {
        this.renderActor();
        this.renderBullet();
    }


    private renderActor() {
        for (let data of DataManager.Instance.state.actors) {
            let { type, id } = data;
            let am = DataManager.Instance.actorMap.get(id);
            //初始化
            if (!am) {
                let prefab = DataManager.Instance.prefabMap.get(type);
                let actor = instantiate(prefab);
                actor.parent = this.stage;
                am = actor.addComponent(ActorMgr);
                DataManager.Instance.actorMap.set(id, am);
                am.init(data);
            } else {
                am.render(data);
            }
        }
    }


    private renderBullet() {
        for (let data of DataManager.Instance.state.bullets) {
            let { type, id } = data;
            let bm = DataManager.Instance.bulletMap.get(id);
            //初始化
            if (!bm) {
                let bullet = ObjectPool.Instance.get(type);
                bm = bullet.getComponent(BulletMgr) || bullet.addComponent(BulletMgr);
                DataManager.Instance.bulletMap.set(id, bm);
                bm.init(data);
            } else {
                bm.render(data);
            }
        }
    }

}

