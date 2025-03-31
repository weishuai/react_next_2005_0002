import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
import axios from 'axios';
export class InvoiceItemController extends BaseController {

  async createInvoiceItem(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/InvoiceItem/createInvoiceItem',
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

  async removeInvoiceItem(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/InvoiceItem/removeInvoiceItem/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getInvoiceItemById(Id:string) {
    console.log('Id:ok999'+Id);
    console.log('this.baseURL()'+this.baseURL());
    // return fetch(this.baseURL()+'/InvoiceItem/getInvoiceItemById/'+Id).then(res => {
    //   ///res.json();
    //   console.log('data:ok999'+JSON.stringify(res));
    // })
    //         .then(d => d);

    return fetch(this.baseURL()+'/InvoiceItem/getInvoiceItemById/'+Id,{method:'GET',headers:{'content-type':'application/json','userToken':''}}).then(res => res.json())
    .then(d => d);


  }

  async getInvoiceItemAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
      'mid':fhevent.mid,
  })
    return fetch(this.baseURL()+'/InvoiceItem/getInvoiceItemAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getInvoiceItemAllView() {

    return fetch(this.baseURL()+'/InvoiceItem/getInvoiceItemAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateInvoiceItemv2(data:any,Id:string,userToken:string) {

    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/InvoiceItem/updateInvoiceItem/'+Id,
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
