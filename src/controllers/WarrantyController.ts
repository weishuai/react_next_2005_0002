import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class WarrantyController extends BaseController {

  async createWarranty(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/Warranty/createWarranty',
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

  async removeWarranty(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/Warranty/removeWarranty/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getWarrantyById(Id:string) {
    return fetch(this.baseURL()+'/Warranty/getWarrantyById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getWarrantyAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/Warranty/getWarrantyAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getWarrantyAllView() {

    return fetch(this.baseURL()+'/Warranty/getWarrantyAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateWarrantyv2(data:any,Id:string,userToken:string) {
    //API.fhcrm.Warranty.updateaWarranty
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/Warranty/updateWarranty/'+Id,
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
