import Singleton from "../Base/Singleton";

export default class DataManager extends Singleton {
  textureMap: any;
  static get Instance() {
    return super.GetInstance<DataManager>();
  }
}
