import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class FhservicePlanController extends BaseController {

  async createFhservicePlan(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/fhservicePlan/createFhservicePlan',
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

  async removeFhservicePlan(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/fhservicePlan/removeFhservicePlan/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getFhservicePlanById(Id:string) {
    return fetch(this.baseURL()+'/fhservicePlan/getFhservicePlanById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getFhservicePlanAll(fhevent) {
    return fetch(this.baseURL()+'/fhservicePlan/getFhservicePlanAll').then(res => res.json())
            .then(d => d);

  }
   async getFhservicePlanAll_count(fhevent) {
    return {"fhok":10}

  }



  async getFhservicePlanAllView() {

    return fetch(this.baseURL()+'/fhservicePlan/getFhservicePlanAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateFhservicePlanv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.FhservicePlan.updateaFhservicePlan
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/fhservicePlan/updateFhservicePlan/'+Id,
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
