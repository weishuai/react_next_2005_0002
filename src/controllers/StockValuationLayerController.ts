import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class StockValuationLayerController extends BaseController {

  async createStockValuationLayer(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/stockValuationLayer/createStockValuationLayer',
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

  async removeStockValuationLayer(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/stockValuationLayer/removeStockValuationLayer/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getStockValuationLayerById(Id:string) {
    return fetch(this.baseURL()+'/stockValuationLayer/getStockValuationLayerById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getStockValuationLayerAll(fhevent) {
    return fetch(this.baseURL()+'/stockValuationLayer/getStockValuationLayerAll').then(res => res.json())
            .then(d => d);

  }
   async getStockValuationLayerAll_count(fhevent) {
    return {"fhok":10}

  }



  async getStockValuationLayerAllView() {

    return fetch(this.baseURL()+'/stockValuationLayer/getStockValuationLayerAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateStockValuationLayerv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.StockValuationLayer.updateaStockValuationLayer
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/stockValuationLayer/updateStockValuationLayer/'+Id,
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
