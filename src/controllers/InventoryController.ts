import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class InventoryController extends BaseController {

  async createInventory(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/inventory/createInventory',
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

  async removeInventory(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/inventory/removeInventory/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getInventoryById(Id:string) {
    return fetch(this.baseURL()+'/inventory/getInventoryById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getInventoryAll(fhevent) {
    return fetch(this.baseURL()+'/inventory/getInventoryAll').then(res => res.json())
            .then(d => d);

  }
   async getInventoryAll_count(fhevent) {
    return {"fhok":10}

  }



  async getInventoryAllView() {

    return fetch(this.baseURL()+'/inventory/getInventoryAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateInventoryv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.Inventory.updateaInventory
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/inventory/updateInventory/'+Id,
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
