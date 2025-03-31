import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class ProcurePriceController extends BaseController {

  async createProcurePrice(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/procurePrice/createProcurePrice',
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

  async removeProcurePrice(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/procurePrice/removeProcurePrice/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getProcurePriceById(Id:string) {
    return fetch(this.baseURL()+'/procurePrice/getProcurePriceById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getProcurePriceAll(fhevent) {
    return fetch(this.baseURL()+'/procurePrice/getProcurePriceAll').then(res => res.json())
            .then(d => d);

  }
   async getProcurePriceAll_count(fhevent) {
    return {"fhok":10}

  }



  async getProcurePriceAllView() {

    return fetch(this.baseURL()+'/procurePrice/getProcurePriceAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateProcurePricev2(data:any,Id:string,userToken:string) {
//     API.fhcrm.ProcurePrice.updateaProcurePrice
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/procurePrice/updateProcurePrice/'+Id,
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
