import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class QuotationController extends BaseController {

  async createQuotation(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/quotation/createQuotation',
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

  async removeQuotation(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/quotation/removeQuotation/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getQuotationById(Id:string) {
    return fetch(this.baseURL()+'/quotation/getQuotationById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getQuotationAll(fhevent:any) {

    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })

    return fetch(this.baseURL()+'/quotation/getQuotationAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }
   async getQuotationAll_count(fhevent) {
    return {"fhok":10}

  }



  async getQuotationAllView() {

    return fetch(this.baseURL()+'/quotation/getQuotationAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateQuotationv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.Quotation.updateaQuotation
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/quotation/updateQuotation/'+Id,
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
