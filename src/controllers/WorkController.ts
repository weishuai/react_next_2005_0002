import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class WorkController extends BaseController {

  async createWork(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/Work/createWork',
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

  async removeWork(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/Work/removeWork/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getWorkById(Id:string) {
    return fetch(this.baseURL()+'/Work/getWorkById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getWorkAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/Work/getWorkAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getWorkAllView() {

    return fetch(this.baseURL()+'/Work/getWorkAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateWorkv2(data:any,Id:string,userToken:string) {
    //API.fhcrm.Work.updateaWork
    console.log('response99901:'+JSON.stringify(data));
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/Work/updateWork/'+Id,
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
