import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class MyBomProductController extends BaseController {

  async createMyBomProduct(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/mybomProduct/createMyBomProduct',
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

  async removeMyBomProduct(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/mybomProduct/removeMyBomProduct/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getMyBomProductById(Id:string) {
    return fetch(this.baseURL()+'/mybomProduct/getMyBomProductById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getMyBomProductAll() {
    return fetch(this.baseURL()+'/mybomProduct/getMyBomProductAll').then(res => res.json())
            .then(d => d);

  }


  async getMyBomProductAllView() {

    return fetch(this.baseURL()+'/mybomProduct/getMyBomProductAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateMyBomProductv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.MyBomProduct.updateaMyBomProduct
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/mybomProduct/updateMyBomProduct/'+Id,
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
