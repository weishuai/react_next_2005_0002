import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class LeadPoolsController extends BaseController {

  async createLeadPools(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/LeadPools/createLeadPools',
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

  async removeLeadPools(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/LeadPools/removeLeadPools/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getLeadPoolsById(Id:string) {
    return fetch(this.baseURL()+'/LeadPools/getLeadPoolsById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getLeadPoolsAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/LeadPools/getLeadPoolsAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getLeadPoolsAllView() {

    return fetch(this.baseURL()+'/LeadPools/getLeadPoolsAllView').then(res => res.json())
            .then(d => d);
  }

  async updateLeadPoolsv2(data:any,Id:string,userToken:string) {
    
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/LeadPools/updateLeadPools/'+Id,
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
