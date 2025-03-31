import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class StockWarehouseOrderpointController extends BaseController {

  async createStockWarehouseOrderpoint(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/stockWarehouseOrderpoint/createStockWarehouseOrderpoint',
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

  async removeStockWarehouseOrderpoint(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/stockWarehouseOrderpoint/removeStockWarehouseOrderpoint/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getStockWarehouseOrderpointById(Id:string) {
    return fetch(this.baseURL()+'/stockWarehouseOrderpoint/getStockWarehouseOrderpointById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getStockWarehouseOrderpointAll(fhevent) {
    return fetch(this.baseURL()+'/stockWarehouseOrderpoint/getStockWarehouseOrderpointAll').then(res => res.json())
            .then(d => d);

  }
   async getStockWarehouseOrderpointAll_count(fhevent) {
    return {"fhok":10}

  }



  async getStockWarehouseOrderpointAllView() {

    return fetch(this.baseURL()+'/stockWarehouseOrderpoint/getStockWarehouseOrderpointAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateStockWarehouseOrderpointv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.StockWarehouseOrderpoint.updateaStockWarehouseOrderpoint
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/stockWarehouseOrderpoint/updateStockWarehouseOrderpoint/'+Id,
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
