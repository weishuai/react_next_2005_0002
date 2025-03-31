import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class ProcurePlanController extends BaseController {

  async createProcurePlan(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/procurePlan/createProcurePlan',
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

  async removeProcurePlan(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/procurePlan/removeProcurePlan/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getProcurePlanById(Id:string) {
    return fetch(this.baseURL()+'/procurePlan/getProcurePlanById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getProcurePlanAll(fhevent) {
    return fetch(this.baseURL()+'/procurePlan/getProcurePlanAll').then(res => res.json())
            .then(d => d);

  }
   async getProcurePlanAll_count(fhevent) {
    return {"fhok":10}

  }



  async getProcurePlanAllView() {

    return fetch(this.baseURL()+'/procurePlan/getProcurePlanAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateProcurePlanv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.ProcurePlan.updateaProcurePlan
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/procurePlan/updateProcurePlan/'+Id,
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
