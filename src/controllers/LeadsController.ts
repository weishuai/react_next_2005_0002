import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class LeadsController extends BaseController {

  async createLeads(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/Leads/createLeads',
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

  async removeLeads(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/Leads/removeLeads/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getLeadsById(Id:string) {
    return fetch(this.baseURL()+'/Leads/getLeadsById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getLeadsAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/Leads/getLeadsAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getLeadsAllView() {

    return fetch(this.baseURL()+'/Leads/getLeadsAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateLeadsv2(data:any,Id:string,userToken:string) {
    //API.fhcrm.Leads.updateaLeads
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/Leads/updateLeads/'+Id,
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
