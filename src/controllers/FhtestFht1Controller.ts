import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class FhtestFht1Controller extends BaseController {

  async createFhtestFht1(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/fhtestFht1/createFhtestFht1',
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

  async removeFhtestFht1(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/fhtestFht1/removeFhtestFht1/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getFhtestFht1ById(Id:string) {
    return fetch(this.baseURL()+'/fhtestFht1/getFhtestFht1ById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getFhtestFht1All(fhevent) {
    return fetch(this.baseURL()+'/fhtestFht1/getFhtestFht1All').then(res => res.json())
            .then(d => d);

  }
   async getFhtestFht1All_count(fhevent) {
    return {"fhok":10}

  }



  async getFhtestFht1AllView() {

    return fetch(this.baseURL()+'/fhtestFht1/getFhtestFht1AllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateFhtestFht1v2(data:any,Id:string,userToken:string) {
//     API.fhcrm.FhtestFht1.updateaFhtestFht1
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/fhtestFht1/updateFhtestFht1/'+Id,
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
