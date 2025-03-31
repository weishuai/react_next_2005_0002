import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class TbmatchingController extends BaseController {

  async createTbmatching(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/tbmatching/createTbmatching',
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

  async removeTbmatching(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/tbmatching/removeTbmatching/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getTbmatchingById(Id:string) {
    return fetch(this.baseURL()+'/tbmatching/getTbmatchingById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getTbmatchingAll(fhevent) {
    return fetch(this.baseURL()+'/tbmatching/getTbmatchingAll').then(res => res.json())
            .then(d => d);

  }
   async getTbmatchingAll_count(fhevent) {
    return {"fhok":10}

  }



  async getTbmatchingAllView() {

    return fetch(this.baseURL()+'/tbmatching/getTbmatchingAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateTbmatchingv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.Tbmatching.updateaTbmatching
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/tbmatching/updateTbmatching/'+Id,
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
