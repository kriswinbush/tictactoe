import { Injectable, Inject } from '@angular/core';
import { WINDOW } from "./window.service";
interface IPlayer {
  name: string 
  isWinner: boolean
  checkedMatrix: Array<number> 
  color: string
  wins: number
}
@Injectable({
  providedIn: 'root'
})
export class LocaldbService {
  DB_VERSION: number = 1;
  DB_NAME: string = "tictacdb"
  _db:Promise<IDBDatabase>;
  request:any;
  store:any;
  constructor(@Inject(WINDOW) private window:Window) {
    
    if('indexedDB' in window) {
      this._db = this.createOpenDb();
    }
  }

  createOpenDb():Promise<IDBDatabase> {
    
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(this.DB_NAME,this.DB_VERSION);

      request.onupgradeneeded = (event) => {
        console.log('on upgrade needed');
        let db = event.target['result'];
        let oStore = db.createObjectStore("players",{keyPath:"name"});
            oStore.createIndex("name", "name", { unique: false });
      }

      request.onsuccess = (event) => {
        let db = event.target['result']
        resolve(db)
      }

      request.onerror = (error) => {
        console.log(error)
        reject(error)
      }
    });
  }

  async getItem(item) {
    let db = await this._db;
    let tx = db.transaction(["players"], "readwrite");
    let playerStore = tx.objectStore('players');
    tx.oncomplete = () => console.log("get all completed");

    return new Promise<IPlayer>((resolve, reject) => {
      tx.onerror = (error) => reject(error);
      let request = playerStore.get(item.name)
      request.onsuccess = (event) => {
        resolve(event.target['result'])
      }
    });

  }
  async getAllItems() {
    let db = await this._db;
    let tx = db.transaction(["players"], "readonly");
    let playerStore = tx.objectStore('players');
    tx.oncomplete = () => console.log("get all completed")
    return new Promise((resolve, reject) => {
      tx.onerror = (error) => reject(error);
      let players = [];
      let request = playerStore.openCursor();
      request.onsuccess = event => {
        var cursor = event.target['result'];
        if(cursor) {
          players.push(cursor.value)
          cursor.continue();
        } else {
          resolve(players);
        }
      }
      request.onerror = error => console.log(error)
    })
  }

  async addItem(item: IPlayer) {
   
    let db = await this._db;
    let tx = db.transaction(["players"], "readwrite");
    let objectStore = tx.objectStore('players');

    return new Promise<IPlayer>((resolve, reject) => {
      tx.oncomplete = event => console.log("all done adding", event);
      tx.onerror = error => reject(error);
      let request = objectStore.get(item.name)
      request.onsuccess = event => {

        if(event.target['result'] === undefined) {
          console.log('no item in db')
          let initRequest = objectStore.add(item);
          initRequest.onsuccess = (event) =>{
            if(event.target['result'] === item.name) {
              resolve(item)
            }
          } 
        } else {
          console.log('item exist in db')
          let data:IPlayer = event.target['result']
          data = Object.assign(data, item);
          let updateRequest = objectStore.put(data);
          updateRequest.onsuccess = (event) =>{
            if(event.target['result'] === data.name) {
              resolve(data)
            }
          } 
        }
      }
      request.onerror = (error) => {
        reject(error);
      } 

    })/* .catch(e => 
      console.log(e.type)
    ) */
   }
}
