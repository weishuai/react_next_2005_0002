import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class QuotationCommentsController extends BaseController {

  async createQuotationComments(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/QuotationComments/createQuotationComments',
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

  async removeQuotationComments(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/QuotationComments/removeQuotationComments/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getQuotationCommentsById(Id:string) {
    return fetch(this.baseURL()+'/QuotationComments/getQuotationCommentsById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getQuotationCommentsAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/QuotationComments/getQuotationCommentsAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getQuotationCommentsAllView() {

    return fetch(this.baseURL()+'/QuotationComments/getQuotationCommentsAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateQuotationCommentsv2(data:any,Id:string,userToken:string) {
    //API.fhcrm.QuotationComments.updateaQuotationComments
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/QuotationComments/updateQuotationComments/'+Id,
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
