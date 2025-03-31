import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
import axios from 'axios';
export class NoteController extends BaseController {

  async createNote(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/note/createNote',
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

  async removeNote(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/note/removeNote/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getNoteById(Id:string) {
    return fetch(this.baseURL()+'/note/getNoteById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getNoteAll(fhevent:any) {

    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    // return fetch(this.baseURL()+'/Opportunity/getOpportunityAll?'+fhurl).then(res => res.json())
    //         .then(d => d);


    return fetch(this.baseURL()+'/note/getNoteAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getNoteAllView() {

    return fetch(this.baseURL()+'/note/getNoteAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateNotev2(data:any,Id:string,userToken:string) {
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/note/updateNote/'+Id,
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
