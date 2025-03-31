import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class FhtestController extends BaseController {

  async createFhtest(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/fhtest/createFhtest',
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

  async removeFhtest(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/fhtest/removeFhtest/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getFhtestById(Id:string) {
    return fetch(this.baseURL()+'/fhtest/getFhtestById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getFhtestAll(fhevent) {
    return fetch(this.baseURL()+'/fhtest/getFhtestAll').then(res => res.json())
            .then(d => d);

  }
   async getFhtestAll_count(fhevent) {
    return {"fhok":10}

  }



  async getFhtestAllView() {

    return fetch(this.baseURL()+'/fhtest/getFhtestAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateFhtestv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.Fhtest.updateaFhtest
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/fhtest/updateFhtest/'+Id,
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
