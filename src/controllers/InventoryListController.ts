import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class InventoryListController extends BaseController {

  async createInventoryList(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/inventoryList/createInventoryList',
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

  async removeInventoryList(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/inventoryList/removeInventoryList/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getInventoryListById(Id:string) {
    return fetch(this.baseURL()+'/inventoryList/getInventoryListById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getInventoryListAll(fhevent) {
    return fetch(this.baseURL()+'/inventoryList/getInventoryListAll').then(res => res.json())
            .then(d => d);

  }
   async getInventoryListAll_count(fhevent) {
    return {"fhok":10}

  }



  async getInventoryListAllView() {

    return fetch(this.baseURL()+'/inventoryList/getInventoryListAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateInventoryListv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.InventoryList.updateaInventoryList
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/inventoryList/updateInventoryList/'+Id,
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
