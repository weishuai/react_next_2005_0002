import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class FhfaultController extends BaseController {

  async createFhfault(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/fhfault/createFhfault',
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

  async removeFhfault(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/fhfault/removeFhfault/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getFhfaultById(Id:string) {
    return fetch(this.baseURL()+'/fhfault/getFhfaultById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getFhfaultAll(fhevent) {
    return fetch(this.baseURL()+'/fhfault/getFhfaultAll').then(res => res.json())
            .then(d => d);

  }
   async getFhfaultAll_count(fhevent) {
    return {"fhok":10}

  }



  async getFhfaultAllView() {

    return fetch(this.baseURL()+'/fhfault/getFhfaultAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateFhfaultv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.Fhfault.updateaFhfault
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/fhfault/updateFhfault/'+Id,
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
