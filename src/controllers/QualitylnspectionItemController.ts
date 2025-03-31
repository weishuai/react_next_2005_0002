import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class QualitylnspectionItemController extends BaseController {

  async createQualitylnspectionItem(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/qualitylnspectionItem/createQualitylnspectionItem',
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

  async removeQualitylnspectionItem(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/qualitylnspectionItem/removeQualitylnspectionItem/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getQualitylnspectionItemById(Id:string) {
    return fetch(this.baseURL()+'/qualitylnspectionItem/getQualitylnspectionItemById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getQualitylnspectionItemAll(fhevent) {
    return fetch(this.baseURL()+'/qualitylnspectionItem/getQualitylnspectionItemAll').then(res => res.json())
            .then(d => d);

  }
   async getQualitylnspectionItemAll_count(fhevent) {
    return {"fhok":10}

  }



  async getQualitylnspectionItemAllView() {

    return fetch(this.baseURL()+'/qualitylnspectionItem/getQualitylnspectionItemAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateQualitylnspectionItemv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.QualitylnspectionItem.updateaQualitylnspectionItem
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/qualitylnspectionItem/updateQualitylnspectionItem/'+Id,
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
