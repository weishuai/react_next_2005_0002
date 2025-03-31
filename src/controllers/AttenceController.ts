import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class AttenceController extends BaseController {

  async createAttence(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/Attence/createAttence',
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

  async removeAttence(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/Attence/removeAttence/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getAttenceById(Id:string) {
    return fetch(this.baseURL()+'/Attence/getAttenceById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getAttenceAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/Attence/getAttenceAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getAttenceAllView() {

    return fetch(this.baseURL()+'/Attence/getAttenceAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateAttencev2(data:any,Id:string,userToken:string) {
    //API.fhcrm.Attence.updateaAttence
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/Attence/updateAttence/'+Id,
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
