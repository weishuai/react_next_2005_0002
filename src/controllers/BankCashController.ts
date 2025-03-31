import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class BankCashController extends BaseController {

  async createBankCash(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/bankCash/createBankCash',
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

  async removeBankCash(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/bankCash/removeBankCash/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getBankCashById(Id:string) {
    return fetch(this.baseURL()+'/bankCash/getBankCashById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getBankCashAll(fhevent) {
    return fetch(this.baseURL()+'/bankCash/getBankCashAll').then(res => res.json())
            .then(d => d);

  }
   async getBankCashAll_count(fhevent) {
    return {"fhok":10}

  }



  async getBankCashAllView() {

    return fetch(this.baseURL()+'/bankCash/getBankCashAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateBankCashv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.BankCash.updateaBankCash
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/bankCash/updateBankCash/'+Id,
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
