import { BaseController } from '../utils/BaseController';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class QuotationController extends BaseController {

  async createQuotation(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/Quotation/createQuotation',
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
      return fetch(this.baseURL()+'/Quotation/removeQuotation/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getQuotationById(Id:string) {
    return fetch(this.baseURL()+'/Quotation/getQuotationById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getQuotationAll() {
    return fetch(this.baseURL()+'/Quotation/getQuotationAll').then(res => res.json())
            .then(d => d);

  }


  async getQuotationAllView() {

    return fetch(this.baseURL()+'/Quotation/getQuotationAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateQuotationv2(data:any,Id:string,userToken:string) {
    //API.fhcrm.Quotation.updateaQuotation
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/Quotation/updateQuotation/'+Id,
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
