import { BaseController} from '../utils/BaseController';
import { PaginationIn } from '../utils/SearchVo';
import { parseParams } from '../utils/parseParams';
import axios from 'axios';
import { AccountTagVo } from '../stores/AccountTag';
export class AccountTagController extends BaseController {

  
  async createAccountTag(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/AccountTag/createAccountTag',
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

  async removeAccountTag(Ids: string[]) {
    ///var data = {username: 'example'};
    //{method:'POST',body: JSON.stringify(data),headers:{'content-type':'application/json','userToken':''}}
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/AccountTag/removeAccountTag/'+id,{method:'GET',headers:{'content-type':'application/json','userToken':''}}).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getAccountTagById(Id:string) {
   ///var data = {username: 'example'};
   //{method:'POST',body: JSON.stringify(data),headers:{'content-type':'application/json','userToken':''}}
    return fetch(this.baseURL()+'/AccountTag/getAccountTagById/'+Id,{method:'GET',headers:{'content-type':'application/json','userToken':''}}).then(res => res.json())
            .then(d => d);

  }

  async getAccountTagAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    console.log('fhurl:'+fhurl);

   ///var data = {username: 'example'};
   //{method:'POST',body: JSON.stringify(data),headers:{'content-type':'application/json','userToken':''}}
    return fetch(this.baseURL()+'/AccountTag/getAccountTagAll?'+fhurl,{method:'GET',headers:{'content-type':'application/json','userToken':''}}).then(res => res.json())
            .then(d => d);
           

  }


  async getAccountTagAllView() {

    return fetch(this.baseURL()+'/AccountTag/getAccountTagAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateAccountTagv2(data:any,Id:string,userToken:string) {
    
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/AccountTag/updateAccountTag/'+Id,
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
