import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class JobItemController extends BaseController {

  async createJobItem(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/JobItem/createJobItem',
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

  async removeJobItem(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/JobItem/removeJobItem/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getJobItemById(Id:string) {
    return fetch(this.baseURL()+'/JobItem/getJobItemById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getJobItemAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
      'mid':fhevent.mid,
  })
    return fetch(this.baseURL()+'/JobItem/getJobItemAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getJobItemAllView() {

    return fetch(this.baseURL()+'/JobItem/getJobItemAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateJobItemv2(data:any,Id:string,userToken:string) {
    //API.fhcrm.JobItem.updateaJobItem
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/JobItem/updateJobItem/'+Id,
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
