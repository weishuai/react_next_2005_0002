import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
//import { ParameterVo } from '../stores/Parameter'; paymentTerm
export class PaymentTermController extends BaseController {

  async create(data:any) {
      let responseData="";
      /////API.fhcrm.Parameter.createParameter
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/paymentTerm/createPaymentTerm',
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

  async remove(Ids: string[]) {
    /////API.fhcrm.Parameter.removeParameter
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/paymentTerm/removePaymentTerm/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getById(Id:string) {
    /////API.fhcrm.Parameter.getParameterById
    return fetch(this.baseURL()+'/paymentTerm/getPaymentTermById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    ////API.fhcrm.Parameter.getParameterAll
    return fetch(this.baseURL()+'/paymentTerm/getPaymentTermAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getAllView() {
    /////API.fhcrm.Parameter.getParameterAllView
    return fetch(this.baseURL()+'/paymentTerm/getPaymentTermAllView').then(res => res.json())
            .then(d => d);
  }

  async update(data:any,Id:string,userToken:string) {
    /////API.fhcrm.Parameter.updateaParameter
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/paymentTerm/updatePaymentTerm/'+Id,
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
