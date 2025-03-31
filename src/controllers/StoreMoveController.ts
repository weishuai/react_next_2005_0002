import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class StoreMoveController extends BaseController {

  async createStoreMove(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/storeMove/createStoreMove',
            headers:{'content-type':'application/json'},
            data : data
          }).then(function (response) {
              console.log('response:'+JSON.stringify(response.data));
              responseData=JSON.stringify(response.data);
            })
            .catch(function (error) {
              responseData="no";
            });
            return {fhok:responseData};
    }

  async removeStoreMove(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/storeMove/removeStoreMove/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getStoreMoveById(Id:string) {
    return fetch(this.baseURL()+'/storeMove/getStoreMoveById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getStoreMoveAll(fhevent) {
    return fetch(this.baseURL()+'/storeMove/getStoreMoveAll').then(res => res.json())
            .then(d => d);

  }
   async getStoreMoveAll_count(fhevent) {
    return {"fhok":10}

  }



  async getStoreMoveAllView() {

    return fetch(this.baseURL()+'/storeMove/getStoreMoveAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateStoreMovev2(data:any,Id:string,userToken:string) {
//     API.fhcrm.StoreMove.updateaStoreMove
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/storeMove/updateStoreMove/'+Id,
         headers:{'content-type':'application/json','userToken':userToken},
         data : data
       }).then(function (response) {
           console.log('response:'+JSON.stringify(response.data));
           responseData=JSON.stringify(response.data);
         })
         .catch(function (error) {
           responseData="no";
         });
         return {fhok:responseData};
  }
}
