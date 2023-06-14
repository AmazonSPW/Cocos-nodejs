/** 
 * @Author       : pengwei.shi
 * @Date         : 2023-06-14 13:04:34
 * @LastEditors  : pengwei.shi
 * @LastEditTime : 2023-06-14 20:55:24
 * @FilePath     : \cocos-nodejs-io-game-start-demo\apps\client\assets\Scripts\Global\ObjectPool.ts
 * @Description  : 
 */
import { Node, instantiate } from "cc";
import { Singleton } from "../Base/Singleton";
import { EntityTypeEnum } from "../Common";
import DataManager from "./DataManager";

@Singleton()
export class ObjectPool {
    public static Instance: ObjectPool;

    private PoolNode: Node;
    private pool: Map<EntityTypeEnum, Node[]> = new Map();

    public get(type: EntityTypeEnum) {
        if (!this.PoolNode) {
            this.PoolNode = new Node("PoolNode");
            this.PoolNode.parent = DataManager.Instance.stage;
        }

        if (!this.pool.has(type)) {
            let continer = new Node(type + "Pool");
            continer.parent = this.PoolNode;
            this.pool.set(type, []);
        }

        let nodes = this.pool.get(type);
        if (nodes.length <= 0) {
            let prefab = DataManager.Instance.prefabMap.get(type);
            let node = instantiate(prefab);
            node.name = type;
            node.parent = this.PoolNode.getChildByName(type + "Pool");
            return node;
        } else {
            let node = nodes.pop();
            node.active = true;
            return node;
        }
    }

    public ret(node: Node) {
        let nodes = this.pool.get(node.name as EntityTypeEnum);
        node.active = false;
        nodes.push(node);
    }
}
