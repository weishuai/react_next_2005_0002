import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class WorkNoteController extends BaseController {

  async createWorkNote(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/WorkNote/createWorkNote',
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

  async removeWorkNote(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/WorkNote/removeWorkNote/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getWorkNoteById(Id:string) {
    return fetch(this.baseURL()+'/WorkNote/getWorkNoteById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getWorkNoteAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
      'mid':fhevent.mid,
  })
    return fetch(this.baseURL()+'/WorkNote/getWorkNoteAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getWorkNoteAllView() {

    return fetch(this.baseURL()+'/WorkNote/getWorkNoteAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateWorkNotev2(data:any,Id:string,userToken:string) {
    //API.fhcrm.WorkNote.updateaWorkNote
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/WorkNote/updateWorkNote/'+Id,
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
