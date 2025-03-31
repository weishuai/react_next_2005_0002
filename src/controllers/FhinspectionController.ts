import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class FhinspectionController extends BaseController {

  async createFhinspection(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/fhinspection/createFhinspection',
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

  async removeFhinspection(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/fhinspection/removeFhinspection/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getFhinspectionById(Id:string) {
    return fetch(this.baseURL()+'/fhinspection/getFhinspectionById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getFhinspectionAll(fhevent) {
    return fetch(this.baseURL()+'/fhinspection/getFhinspectionAll').then(res => res.json())
            .then(d => d);

  }
   async getFhinspectionAll_count(fhevent) {
    return {"fhok":10}

  }



  async getFhinspectionAllView() {

    return fetch(this.baseURL()+'/fhinspection/getFhinspectionAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateFhinspectionv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.Fhinspection.updateaFhinspection
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/fhinspection/updateFhinspection/'+Id,
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
