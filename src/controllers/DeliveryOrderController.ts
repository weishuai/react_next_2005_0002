import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class DeliveryOrderController extends BaseController {

  async createDeliveryOrder(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/DeliveryOrder/createDeliveryOrder',
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

  async removeDeliveryOrder(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/DeliveryOrder/removeDeliveryOrder/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getDeliveryOrderById(Id:string) {
    return fetch(this.baseURL()+'/DeliveryOrder/getDeliveryOrderById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getDeliveryOrderAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/DeliveryOrder/getDeliveryOrderAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getDeliveryOrderAllView() {

    return fetch(this.baseURL()+'/DeliveryOrder/getDeliveryOrderAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateDeliveryOrderv2(data:any,Id:string,userToken:string) {
    //API.fhcrm.DeliveryOrder.updateaDeliveryOrder
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/DeliveryOrder/updateDeliveryOrder/'+Id,
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
