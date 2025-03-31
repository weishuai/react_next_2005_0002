import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class SaleContractController extends BaseController {

  async createSaleContract(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/saleContract/createSaleContract',
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

  async removeSaleContract(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/saleContract/removeSaleContract/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getSaleContractById(Id:string) {
    return fetch(this.baseURL()+'/saleContract/getSaleContractById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getSaleContractAll(fhevent) {
    return fetch(this.baseURL()+'/saleContract/getSaleContractAll').then(res => res.json())
            .then(d => d);

  }
   async getSaleContractAll_count(fhevent) {
    return {"fhok":10}

  }



  async getSaleContractAllView() {

    return fetch(this.baseURL()+'/saleContract/getSaleContractAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateSaleContractv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.SaleContract.updateaSaleContract
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/saleContract/updateSaleContract/'+Id,
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
