import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class ActivityController extends BaseController {

  async createActivity(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/Activity/createActivity',
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

  async removeActivity(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/Activity/removeActivity/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getActivityById(Id:string) {
    return fetch(this.baseURL()+'/Activity/getActivityById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getActivityAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/Activity/getActivityAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getActivityAllView() {

    return fetch(this.baseURL()+'/Activity/getActivityAllView').then(res => res.json())
            .then(d => d);
  }

  async updateActivityv2(data:any,Id:string,userToken:string) {
    //API.fhcrm.Activity.updateaActivity
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/Activity/updateActivity/'+Id,
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
