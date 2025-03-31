import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class ProductController extends BaseController {

  async createProduct(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/Product/createProduct',
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

  async removeProduct(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/Product/removeProduct/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getProductById(Id:string) {
    return fetch(this.baseURL()+'/Product/getProductById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getProductAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
  console.log('fhurl:'+fhurl);
    return fetch(this.baseURL()+'/Product/getProductAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getProductAllView() {
    console.log('response:');
    return fetch(this.baseURL()+'/Product/getFHProductAllView').then(res => res.json())
            .then(d => d);
  }

  async updateProductv2(data:any,Id:string,userToken:string) {
    /////API.fhcrm.Product.updateaProduct
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/Product/updateProduct/'+Id,
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
