import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class FhmeasuringController extends BaseController {

  async createFhmeasuring(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/fhmeasuring/createFhmeasuring',
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

  async removeFhmeasuring(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/fhmeasuring/removeFhmeasuring/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getFhmeasuringById(Id:string) {
    return fetch(this.baseURL()+'/fhmeasuring/getFhmeasuringById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getFhmeasuringAll(fhevent) {
    return fetch(this.baseURL()+'/fhmeasuring/getFhmeasuringAll').then(res => res.json())
            .then(d => d);

  }
   async getFhmeasuringAll_count(fhevent) {
    return {"fhok":10}

  }



  async getFhmeasuringAllView() {

    return fetch(this.baseURL()+'/fhmeasuring/getFhmeasuringAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateFhmeasuringv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.Fhmeasuring.updateaFhmeasuring
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/fhmeasuring/updateFhmeasuring/'+Id,
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
