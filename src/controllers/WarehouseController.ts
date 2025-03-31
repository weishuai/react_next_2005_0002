import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class WarehouseController extends BaseController {

  async createWarehouse(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/warehouse/createWarehouse',
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

  async removeWarehouse(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/warehouse/removeWarehouse/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getWarehouseById(Id:string) {
    return fetch(this.baseURL()+'/warehouse/getWarehouseById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getWarehouseAll(fhevent) {
    return fetch(this.baseURL()+'/warehouse/getWarehouseAll').then(res => res.json())
            .then(d => d);

  }
   async getWarehouseAll_count(fhevent) {
    return {"fhok":10}

  }



  async getWarehouseAllView() {

    return fetch(this.baseURL()+'/warehouse/getWarehouseAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateWarehousev2(data:any,Id:string,userToken:string) {
//     API.fhcrm.Warehouse.updateaWarehouse
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/warehouse/updateWarehouse/'+Id,
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
