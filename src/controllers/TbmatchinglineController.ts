import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class TbmatchinglineController extends BaseController {

  async createTbmatchingline(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/tbmatchingline/createTbmatchingline',
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

  async removeTbmatchingline(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/tbmatchingline/removeTbmatchingline/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getTbmatchinglineById(Id:string) {
    return fetch(this.baseURL()+'/tbmatchingline/getTbmatchinglineById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getTbmatchinglineAll(fhevent) {
    return fetch(this.baseURL()+'/tbmatchingline/getTbmatchinglineAll').then(res => res.json())
            .then(d => d);

  }
   async getTbmatchinglineAll_count(fhevent) {
    return {"fhok":10}

  }



  async getTbmatchinglineAllView() {

    return fetch(this.baseURL()+'/tbmatchingline/getTbmatchinglineAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateTbmatchinglinev2(data:any,Id:string,userToken:string) {
//     API.fhcrm.Tbmatchingline.updateaTbmatchingline
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/tbmatchingline/updateTbmatchingline/'+Id,
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
