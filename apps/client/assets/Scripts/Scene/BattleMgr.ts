/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-11 22:02:37
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-12 17:56:54
 * @FilePath     : \client\assets\Scripts\Scene\BattleMgr.ts
 * @Description  : 
 */
import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { EEntityType } from '../Common';
import { ActorMgr } from '../Entity/Actor/ActorMgr';
import { EPrefabPath } from '../Enum';
import DataManager from '../Global/DataManager';
import { ResourceManager } from '../Global/ResourceManager';
import { JoyStickMgr } from '../UI/JoyStickMgr';
const { ccclass, property } = _decorator;

@ccclass('BattleMgr')
export class BattleMgr extends Component {
    public stage: Node;
    public ui: Node;
    private _useUpdate: boolean = false;
    protected onLoad(): void {
        this.stage = this.node.getChildByName("Stage");
        this.ui = this.node.getChildByName("UI");
        DataManager.Instance.jm = this.ui.getComponentInChildren(JoyStickMgr);
    }

    protected async start(): Promise<void> {
        this.stage.destroyAllChildren();
        await this.loadRes();
        this.initMap();
        this._useUpdate = true;
    }

    protected initMap() {
        let prefab = DataManager.Instance.prefabMap.get(EEntityType.Map);
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
        await Promise.all(list);
    }

    protected update(dt: number): void {
        if (!this._useUpdate) return;
        this.render();
    }

    private render() {
        this.renderActor();
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

}

