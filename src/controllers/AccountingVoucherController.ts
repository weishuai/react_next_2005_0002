import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class AccountingVoucherController extends BaseController {

  async createAccountingVoucher(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/accountingVoucher/createAccountingVoucher',
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

  async removeAccountingVoucher(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/accountingVoucher/removeAccountingVoucher/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getAccountingVoucherById(Id:string) {
    return fetch(this.baseURL()+'/accountingVoucher/getAccountingVoucherById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getAccountingVoucherAll(fhevent) {
    return fetch(this.baseURL()+'/accountingVoucher/getAccountingVoucherAll').then(res => res.json())
            .then(d => d);

  }
   async getAccountingVoucherAll_count(fhevent) {
    return {"fhok":10}

  }



  async getAccountingVoucherAllView() {

    return fetch(this.baseURL()+'/accountingVoucher/getAccountingVoucherAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateAccountingVoucherv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.AccountingVoucher.updateaAccountingVoucher
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/accountingVoucher/updateAccountingVoucher/'+Id,
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
