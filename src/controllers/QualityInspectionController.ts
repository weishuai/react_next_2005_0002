import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class QualityInspectionController extends BaseController {

  async createQualityInspection(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/qualityInspection/createQualityInspection',
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

  async removeQualityInspection(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/qualityInspection/removeQualityInspection/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getQualityInspectionById(Id:string) {
    return fetch(this.baseURL()+'/qualityInspection/getQualityInspectionById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getQualityInspectionAll(fhevent) {
    return fetch(this.baseURL()+'/qualityInspection/getQualityInspectionAll').then(res => res.json())
            .then(d => d);

  }
   async getQualityInspectionAll_count(fhevent) {
    return {"fhok":10}

  }



  async getQualityInspectionAllView() {

    return fetch(this.baseURL()+'/qualityInspection/getQualityInspectionAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateQualityInspectionv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.QualityInspection.updateaQualityInspection
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/qualityInspection/updateQualityInspection/'+Id,
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
