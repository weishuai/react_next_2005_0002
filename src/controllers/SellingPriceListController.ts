import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class SellingPriceListController extends BaseController {

  async createSellingPriceList(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/sellingPriceList/createSellingPriceList',
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

  async removeSellingPriceList(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/sellingPriceList/removeSellingPriceList/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getSellingPriceListById(Id:string) {
    return fetch(this.baseURL()+'/sellingPriceList/getSellingPriceListById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getSellingPriceListAll(fhevent) {
    return fetch(this.baseURL()+'/sellingPriceList/getSellingPriceListAll').then(res => res.json())
            .then(d => d);

  }
   async getSellingPriceListAll_count(fhevent) {
    return {"fhok":10}

  }



  async getSellingPriceListAllView() {

    return fetch(this.baseURL()+'/sellingPriceList/getSellingPriceListAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateSellingPriceListv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.SellingPriceList.updateaSellingPriceList
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/sellingPriceList/updateSellingPriceList/'+Id,
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
