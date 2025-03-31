import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class SellingPriceController extends BaseController {

  async createSellingPrice(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/sellingPrice/createSellingPrice',
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

  async removeSellingPrice(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/sellingPrice/removeSellingPrice/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getSellingPriceById(Id:string) {
    return fetch(this.baseURL()+'/sellingPrice/getSellingPriceById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getSellingPriceAll(fhevent) {
    return fetch(this.baseURL()+'/sellingPrice/getSellingPriceAll').then(res => res.json())
            .then(d => d);

  }
   async getSellingPriceAll_count(fhevent) {
    return {"fhok":10}

  }



  async getSellingPriceAllView() {

    return fetch(this.baseURL()+'/sellingPrice/getSellingPriceAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateSellingPricev2(data:any,Id:string,userToken:string) {
//     API.fhcrm.SellingPrice.updateaSellingPrice
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/sellingPrice/updateSellingPrice/'+Id,
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
