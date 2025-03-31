import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class FhrunningController extends BaseController {

  async createFhrunning(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/fhrunning/createFhrunning',
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

  async removeFhrunning(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/fhrunning/removeFhrunning/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getFhrunningById(Id:string) {
    return fetch(this.baseURL()+'/fhrunning/getFhrunningById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getFhrunningAll(fhevent) {
    return fetch(this.baseURL()+'/fhrunning/getFhrunningAll').then(res => res.json())
            .then(d => d);

  }
   async getFhrunningAll_count(fhevent) {
    return {"fhok":10}

  }



  async getFhrunningAllView() {

    return fetch(this.baseURL()+'/fhrunning/getFhrunningAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateFhrunningv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.Fhrunning.updateaFhrunning
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/fhrunning/updateFhrunning/'+Id,
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
