import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
import axios from 'axios';
export class InvoicePaymentController extends BaseController {

  async createInvoicePayment(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/InvoicePayment/createInvoicePayment',
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

  async removeInvoicePayment(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/InvoicePayment/removeInvoicePayment/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getInvoicePaymentById(Id:string) {
    return fetch(this.baseURL()+'/InvoicePayment/getInvoicePaymentById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getInvoicePaymentAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
      'mid':fhevent.mid,
  })
    return fetch(this.baseURL()+'/InvoicePayment/getInvoicePaymentAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getInvoicePaymentAllView() {

    return fetch(this.baseURL()+'/InvoicePayment/getInvoicePaymentAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateInvoicePaymentv2(data:any,Id:string,userToken:string) {
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/InvoicePayment/updateInvoicePayment/'+Id,
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
