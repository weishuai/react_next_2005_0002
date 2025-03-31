import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class ReturnorderController extends BaseController {

  async createReturnorder(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/returnorder/createReturnorder',
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

  async removeReturnorder(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/returnorder/removeReturnorder/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getReturnorderById(Id:string) {
    return fetch(this.baseURL()+'/returnorder/getReturnorderById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getReturnorderAll(fhevent) {
    return fetch(this.baseURL()+'/returnorder/getReturnorderAll').then(res => res.json())
            .then(d => d);

  }
   async getReturnorderAll_count(fhevent) {
    return {"fhok":10}

  }



  async getReturnorderAllView() {

    return fetch(this.baseURL()+'/returnorder/getReturnorderAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateReturnorderv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.Returnorder.updateaReturnorder
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/returnorder/updateReturnorder/'+Id,
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
