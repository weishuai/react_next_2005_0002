import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class FHRoleController extends BaseController {

  async createFHRole(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/FHRole/createFHRole',
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

  async removeFHRole(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/FHRole/removeFHRole/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getFHRoleById(Id:string) {
    return fetch(this.baseURL()+'/FHRole/getFHRoleById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getFHRoleAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
  console.log('fhurl:'+fhurl);
    return fetch(this.baseURL()+'/FHRole/getFHRoleAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getFHRoleAllView() {

    return fetch(this.baseURL()+'/FHRole/getFHRoleAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateFHRolev2(data:any,Id:string,userToken:string) {
    
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/FHRole/updateFHRole/'+Id,
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
