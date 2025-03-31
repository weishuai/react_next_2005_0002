import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class AccountingVoucherListController extends BaseController {

  async createAccountingVoucherList(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/accountingVoucherList/createAccountingVoucherList',
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

  async removeAccountingVoucherList(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/accountingVoucherList/removeAccountingVoucherList/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getAccountingVoucherListById(Id:string) {
    return fetch(this.baseURL()+'/accountingVoucherList/getAccountingVoucherListById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getAccountingVoucherListAll(fhevent) {
    return fetch(this.baseURL()+'/accountingVoucherList/getAccountingVoucherListAll').then(res => res.json())
            .then(d => d);

  }
   async getAccountingVoucherListAll_count(fhevent) {
    return {"fhok":10}

  }



  async getAccountingVoucherListAllView() {

    return fetch(this.baseURL()+'/accountingVoucherList/getAccountingVoucherListAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateAccountingVoucherListv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.AccountingVoucherList.updateaAccountingVoucherList
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/accountingVoucherList/updateAccountingVoucherList/'+Id,
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
