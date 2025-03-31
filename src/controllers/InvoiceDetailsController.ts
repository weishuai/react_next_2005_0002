import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
import axios from 'axios';
export class InvoiceDetailsController extends BaseController {

  async createInvoiceDetails(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/InvoiceDetails/createInvoiceDetails',
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

  async removeInvoiceDetails(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/InvoiceDetails/removeInvoiceDetails/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getInvoiceDetailsById(Id:string) {
    return fetch(this.baseURL()+'/InvoiceDetails/getInvoiceDetailsById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getInvoiceDetailsAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/InvoiceDetails/getInvoiceDetailsAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getInvoiceDetailsAllView() {

    return fetch(this.baseURL()+'/InvoiceDetails/getInvoiceDetailsAllView').then(res => res.json())
            .then(d => d);
  }

  async updateInvoiceDetailsv2(data:any,Id:string,userToken:string) {

    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/InvoiceDetails/updateInvoiceDetails/'+Id,
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
