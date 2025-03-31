import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class QuotationItemController extends BaseController {

  async createQuotationItem(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/QuotationItem/createQuotationItem',
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

  async removeQuotationItem(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/QuotationItem/removeQuotationItem/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getQuotationItemById(Id:string) {
    return fetch(this.baseURL()+'/QuotationItem/getQuotationItemById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getQuotationItemAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/QuotationItem/getQuotationItemAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getQuotationItemAllView() {

    return fetch(this.baseURL()+'/QuotationItem/getQuotationItemAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateQuotationItemv2(data:any,Id:string,userToken:string) {
    //API.fhcrm.QuotationItem.updateaQuotationItem
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/QuotationItem/updateQuotationItem/'+Id,
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
