import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class PurchaseOrderController extends BaseController {

  async createPurchaseOrder(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/PurchaseOrder/createPurchaseOrder',
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

  async removePurchaseOrder(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/PurchaseOrder/removePurchaseOrder/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getPurchaseOrderById(Id:string) {
    return fetch(this.baseURL()+'/PurchaseOrder/getPurchaseOrderById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getPurchaseOrderAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/PurchaseOrder/getPurchaseOrderAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getPurchaseOrderAllView() {

    return fetch(this.baseURL()+'/PurchaseOrder/getPurchaseOrderAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updatePurchaseOrderv2(data:any,Id:string,userToken:string) {
    //API.fhcrm.PurchaseOrder.updateaPurchaseOrder
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/PurchaseOrder/updatePurchaseOrder/'+Id,
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
