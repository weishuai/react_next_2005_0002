import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
///import fetch from 'node-fetch';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class CampaignController extends BaseController {

  async createCampaign(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/campaign/createCampaign',
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

  async removeCampaign(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/campaign/removeCampaign/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getCampaignById(Id:string) {
    return fetch(this.baseURL()+'/campaign/getCampaignById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getCampaignAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
  console.log('fhurl:'+fhurl);
  return fetch(this.baseURL()+'/campaign/getCampaignAll?'+fhurl).then(res => res.json())
  .then(d => d);
  }


  async getCampaignAllView() {

    return fetch(this.baseURL()+'/campaign/getCampaignAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateCampaignv2(data:any,Id:string,userToken:string) {
    ////API.fhcrm.Campaign.updateaCampaign
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/campaign/updateCampaign/'+Id,
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
