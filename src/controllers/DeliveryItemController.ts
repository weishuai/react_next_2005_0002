import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class DeliveryItemController extends BaseController {

  async createDeliveryItem(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/DeliveryItem/createDeliveryItem',
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

  async removeDeliveryItem(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/DeliveryItem/removeDeliveryItem/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getDeliveryItemById(Id:string) {
    return fetch(this.baseURL()+'/DeliveryItem/getDeliveryItemById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getDeliveryItemAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/DeliveryItem/getDeliveryItemAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getDeliveryItemAllView() {

    return fetch(this.baseURL()+'/DeliveryItem/getDeliveryItemAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateDeliveryItemv2(data:any,Id:string,userToken:string) {
    //API.fhcrm.DeliveryItem.updateaDeliveryItem
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/DeliveryItem/updateDeliveryItem/'+Id,
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
