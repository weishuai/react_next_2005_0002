import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class ProcurePlanListController extends BaseController {

  async createProcurePlanList(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/procurePlanList/createProcurePlanList',
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

  async removeProcurePlanList(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/procurePlanList/removeProcurePlanList/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getProcurePlanListById(Id:string) {
    return fetch(this.baseURL()+'/procurePlanList/getProcurePlanListById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getProcurePlanListAll(fhevent) {
    return fetch(this.baseURL()+'/procurePlanList/getProcurePlanListAll').then(res => res.json())
            .then(d => d);

  }
   async getProcurePlanListAll_count(fhevent) {
    return {"fhok":10}

  }



  async getProcurePlanListAllView() {

    return fetch(this.baseURL()+'/procurePlanList/getProcurePlanListAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateProcurePlanListv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.ProcurePlanList.updateaProcurePlanList
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/procurePlanList/updateProcurePlanList/'+Id,
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
