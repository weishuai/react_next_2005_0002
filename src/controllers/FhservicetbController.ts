import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class FhservicetbController extends BaseController {

  async createFhservicetb(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/fhservicetb/createFhservicetb',
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

  async removeFhservicetb(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/fhservicetb/removeFhservicetb/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getFhservicetbById(Id:string) {
    return fetch(this.baseURL()+'/fhservicetb/getFhservicetbById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getFhservicetbAll(fhevent) {
    return fetch(this.baseURL()+'/fhservicetb/getFhservicetbAll').then(res => res.json())
            .then(d => d);

  }
   async getFhservicetbAll_count(fhevent) {
    return {"fhok":10}

  }



  async getFhservicetbAllView() {

    return fetch(this.baseURL()+'/fhservicetb/getFhservicetbAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateFhservicetbv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.Fhservicetb.updateaFhservicetb
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/fhservicetb/updateFhservicetb/'+Id,
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
