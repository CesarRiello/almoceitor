export class LocalStorageService {
  list = [];
  key = 'app';

  constructor(_key:string){
      this.key = _key
  }

  updateList(list=this.list, key=this.key){
    if(window.localStorage) {
      window.localStorage.setItem(key, list.join('|'))
    }
  }

  getList(key=this.key){
    if(window.localStorage) {
      this.list = (window.localStorage.getItem(key) || '').split('|')
    }
    return this.list
  }

}
