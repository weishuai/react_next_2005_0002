import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class JobController extends BaseController {

  async createJob(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/Job/createJob',
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

  async removeJob(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/Job/removeJob/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getJobById(Id:string) {
    return fetch(this.baseURL()+'/Job/getJobById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getJobAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/Job/getJobAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getJobAllView() {

    return fetch(this.baseURL()+'/Job/getJobAllView').then(res => res.json())
            .then(d => d);
  }

  async updateJobv2(data:any,Id:string,userToken:string) {
    //API.fhcrm.Job.updateaJob
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/Job/updateJob/'+Id,
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
