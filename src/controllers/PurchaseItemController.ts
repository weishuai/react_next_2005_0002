import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class PurchaseItemController extends BaseController {

  async createPurchaseItem(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/PurchaseItem/createPurchaseItem',
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

  async removePurchaseItem(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/PurchaseItem/removePurchaseItem/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getPurchaseItemById(Id:string) {
    return fetch(this.baseURL()+'/PurchaseItem/getPurchaseItemById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getPurchaseItemAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/PurchaseItem/getPurchaseItemAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getPurchaseItemAllView() {

    return fetch(this.baseURL()+'/PurchaseItem/getPurchaseItemAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updatePurchaseItemv2(data:any,Id:string,userToken:string) {
    //API.fhcrm.PurchaseItem.updateaPurchaseItem
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/PurchaseItem/updatePurchaseItem/'+Id,
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
