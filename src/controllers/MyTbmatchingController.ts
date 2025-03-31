import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class MyTbmatchingController extends BaseController {

  async createMyTbmatching(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/mytbmatching/createMyTbmatching',
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

  async removeMyTbmatching(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/mytbmatching/removeMyTbmatching/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getMyTbmatchingById(Id:string) {
    return fetch(this.baseURL()+'/mytbmatching/getMyTbmatchingById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getMyTbmatchingAll(fhevent) {
    return fetch(this.baseURL()+'/mytbmatching/getMyTbmatchingAll').then(res => res.json())
            .then(d => d);

  }
   async getMyTbmatchingAll_count(fhevent) {
    return {"fhok":10}

  }



  async getMyTbmatchingAllView() {

    return fetch(this.baseURL()+'/mytbmatching/getMyTbmatchingAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateMyTbmatchingv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.MyTbmatching.updateaMyTbmatching
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/mytbmatching/updateMyTbmatching/'+Id,
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
