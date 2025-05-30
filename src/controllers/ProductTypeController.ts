import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class ProductTypeController extends BaseController {

  async createProductType(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/ProductType/createProductType',
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

  async removeProductType(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/ProductType/removeProductType/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getProductTypeById(Id:string) {
    return fetch(this.baseURL()+'/ProductType/getProductTypeById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getProductTypeAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
  console.log('fhurl:'+fhurl);
    return fetch(this.baseURL()+'/ProductType/getProductTypeAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getProductTypeAllView() {

    return fetch(this.baseURL()+'/ProductType/getProductTypeAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateProductTypev2(data:any,Id:string,userToken:string) {
    //API.fhcrm.ProductType.updateaProductType
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/ProductType/updateProductType/'+Id,
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
