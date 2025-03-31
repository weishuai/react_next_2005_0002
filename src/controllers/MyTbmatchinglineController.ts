import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class MyTbmatchinglineController extends BaseController {

  async createMyTbmatchingline(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/mytbmatchingline/createMyTbmatchingline',
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

  async removeMyTbmatchingline(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/mytbmatchingline/removeMyTbmatchingline/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getMyTbmatchinglineById(Id:string) {
    return fetch(this.baseURL()+'/mytbmatchingline/getMyTbmatchinglineById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getMyTbmatchinglineAll(fhevent) {
    return fetch(this.baseURL()+'/mytbmatchingline/getMyTbmatchinglineAll').then(res => res.json())
            .then(d => d);

  }
   async getMyTbmatchinglineAll_count(fhevent) {
    return {"fhok":10}

  }



  async getMyTbmatchinglineAllView() {

    return fetch(this.baseURL()+'/mytbmatchingline/getMyTbmatchinglineAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateMyTbmatchinglinev2(data:any,Id:string,userToken:string) {
//     API.fhcrm.MyTbmatchingline.updateaMyTbmatchingline
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/mytbmatchingline/updateMyTbmatchingline/'+Id,
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
