import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class StockQuantController extends BaseController {

  async createStockQuant(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/stockQuant/createStockQuant',
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

  async removeStockQuant(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/stockQuant/removeStockQuant/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getStockQuantById(Id:string) {
    return fetch(this.baseURL()+'/stockQuant/getStockQuantById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getStockQuantAll(fhevent) {
    return fetch(this.baseURL()+'/stockQuant/getStockQuantAll').then(res => res.json())
            .then(d => d);

  }
   async getStockQuantAll_count(fhevent) {
    return {"fhok":10}

  }



  async getStockQuantAllView() {

    return fetch(this.baseURL()+'/stockQuant/getStockQuantAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateStockQuantv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.StockQuant.updateaStockQuant
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/stockQuant/updateStockQuant/'+Id,
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
