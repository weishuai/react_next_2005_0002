import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class OpportunityController extends BaseController {

  async createOpportunity(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/Opportunity/createOpportunity',
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

  async removeOpportunity(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/Opportunity/removeOpportunity/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getOpportunityById(Id:string) {
    return fetch(this.baseURL()+'/Opportunity/getOpportunityById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getOpportunityAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/Opportunity/getOpportunityAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getOpportunityAllView() {

    return fetch(this.baseURL()+'/Opportunity/getOpportunityAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateOpportunityv2(data:any,Id:string,userToken:string) {
    //API.fhcrm.Opportunity.updateaOpportunity
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/Opportunity/updateOpportunity/'+Id,
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
