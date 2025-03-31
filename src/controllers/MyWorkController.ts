import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class MyWorkController extends BaseController {

  async createMyWork(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/mywork/createMyWork',
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

  async removeMyWork(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/mywork/removeMyWork/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getMyWorkById(Id:string) {
    return fetch(this.baseURL()+'/mywork/getMyWorkById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getMyWorkAll(fhevent) {
    return fetch(this.baseURL()+'/mywork/getMyWorkAll').then(res => res.json())
            .then(d => d);

  }
   async getMyWorkAll_count(fhevent) {
    return {"fhok":10}

  }



  async getMyWorkAllView() {

    return fetch(this.baseURL()+'/mywork/getMyWorkAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateMyWorkv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.MyWork.updateaMyWork
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/mywork/updateMyWork/'+Id,
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
