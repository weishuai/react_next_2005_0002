import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class StoreMoveListController extends BaseController {

  async createStoreMoveList(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/storeMoveList/createStoreMoveList',
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

  async removeStoreMoveList(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/storeMoveList/removeStoreMoveList/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getStoreMoveListById(Id:string) {
    return fetch(this.baseURL()+'/storeMoveList/getStoreMoveListById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getStoreMoveListAll(fhevent) {
    return fetch(this.baseURL()+'/storeMoveList/getStoreMoveListAll').then(res => res.json())
            .then(d => d);

  }
   async getStoreMoveListAll_count(fhevent) {
    return {"fhok":10}

  }



  async getStoreMoveListAllView() {

    return fetch(this.baseURL()+'/storeMoveList/getStoreMoveListAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateStoreMoveListv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.StoreMoveList.updateaStoreMoveList
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/storeMoveList/updateStoreMoveList/'+Id,
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
