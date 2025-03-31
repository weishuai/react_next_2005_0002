import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class TemplateController extends BaseController {

  async createTemplate(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/Template/createTemplate',
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

  async removeTemplate(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/Template/removeTemplate/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getTemplateById(Id:string) {
    return fetch(this.baseURL()+'/Template/getTemplateById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getTemplateAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/Template/getTemplateAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getTemplateAllView() {

    return fetch(this.baseURL()+'/Template/getTemplateAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateTemplatev2(data:any,Id:string,userToken:string) {
    //API.fhcrm.Template.updateaTemplate
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/Template/updateTemplate/'+Id,
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
