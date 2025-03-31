import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class FhreformController extends BaseController {

  async createFhreform(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/fhreform/createFhreform',
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

  async removeFhreform(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/fhreform/removeFhreform/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getFhreformById(Id:string) {
    return fetch(this.baseURL()+'/fhreform/getFhreformById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getFhreformAll(fhevent) {
    return fetch(this.baseURL()+'/fhreform/getFhreformAll').then(res => res.json())
            .then(d => d);

  }
   async getFhreformAll_count(fhevent) {
    return {"fhok":10}

  }



  async getFhreformAllView() {

    return fetch(this.baseURL()+'/fhreform/getFhreformAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateFhreformv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.Fhreform.updateaFhreform
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/fhreform/updateFhreform/'+Id,
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
