import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class WorkItemController extends BaseController {

  async createWorkItem(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/WorkItem/createWorkItem',
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

  async removeWorkItem(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/WorkItem/removeWorkItem/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getWorkItemById(Id:string) {
    return fetch(this.baseURL()+'/WorkItem/getWorkItemById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getWorkItemAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
      'mid':fhevent.mid,
  })
    return fetch(this.baseURL()+'/WorkItem/getWorkItemAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getWorkItemAllView() {

    return fetch(this.baseURL()+'/WorkItem/getWorkItemAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateWorkItemv2(data:any,Id:string,userToken:string) {
    //API.fhcrm.WorkItem.updateaWorkItem
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/WorkItem/updateWorkItem/'+Id,
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
