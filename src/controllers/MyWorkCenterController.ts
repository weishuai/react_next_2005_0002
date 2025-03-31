import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class MyWorkCenterController extends BaseController {

  async createMyWorkCenter(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/myworkCenter/createMyWorkCenter',
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

  async removeMyWorkCenter(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/myworkCenter/removeMyWorkCenter/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getMyWorkCenterById(Id:string) {
    return fetch(this.baseURL()+'/myworkCenter/getMyWorkCenterById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getMyWorkCenterAll(fhevent) {
    return fetch(this.baseURL()+'/myworkCenter/getMyWorkCenterAll').then(res => res.json())
            .then(d => d);

  }
   async getMyWorkCenterAll_count(fhevent) {
    return {"fhok":10}

  }



  async getMyWorkCenterAllView() {

    return fetch(this.baseURL()+'/myworkCenter/getMyWorkCenterAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateMyWorkCenterv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.MyWorkCenter.updateaMyWorkCenter
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/myworkCenter/updateMyWorkCenter/'+Id,
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
