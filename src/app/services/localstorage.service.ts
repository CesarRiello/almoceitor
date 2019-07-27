export class LocalStorageService {
  list = [];
  _object = {};
  key = 'app';

  constructor(_key:string){
      this.key = _key
  }

  update(_object=this._object, key=this.key){
    if(window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(_object))
    }
  }

  updateList(list=this.list, key=this.key){
    if(window.localStorage) {
      window.localStorage.setItem(key, list.join('|'))
    }
  }

  get(key=this.key){
    if(window.localStorage) {
      const saveStorage = window.localStorage.getItem(key) || '{}'
      try {
        this._object = JSON.parse(saveStorage)
      } catch (e) {
        console.error(e);
        this._object = {}
      }
    }
    return this._object
  }

  getList(key=this.key){
    if(window.localStorage) {
      this.list = (window.localStorage.getItem(key) || '').split('|')
    }
    return this.list
  }

}
