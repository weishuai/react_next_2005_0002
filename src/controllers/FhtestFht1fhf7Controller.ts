import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class FhtestFht1fhf7Controller extends BaseController {

  async createFhtestFht1fhf7(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/fhtestFht1fhf7/createFhtestFht1fhf7',
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

  async removeFhtestFht1fhf7(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/fhtestFht1fhf7/removeFhtestFht1fhf7/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getFhtestFht1fhf7ById(Id:string) {
    return fetch(this.baseURL()+'/fhtestFht1fhf7/getFhtestFht1fhf7ById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getFhtestFht1fhf7All() {
    return fetch(this.baseURL()+'/fhtestFht1fhf7/getFhtestFht1fhf7All').then(res => res.json())
            .then(d => d);

  }


  async getFhtestFht1fhf7AllView() {

    return fetch(this.baseURL()+'/fhtestFht1fhf7/getFhtestFht1fhf7AllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateFhtestFht1fhf7v2(data:any,Id:string,userToken:string) {
//     API.fhcrm.FhtestFht1fhf7.updateaFhtestFht1fhf7
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/fhtestFht1fhf7/updateFhtestFht1fhf7/'+Id,
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
