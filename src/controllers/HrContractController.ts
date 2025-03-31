import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class HrContractController extends BaseController {

  async createHrContract(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/hrContract/createHrContract',
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

  async removeHrContract(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/hrContract/removeHrContract/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getHrContractById(Id:string) {
    return fetch(this.baseURL()+'/hrContract/getHrContractById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getHrContractAll(fhevent) {
    return fetch(this.baseURL()+'/hrContract/getHrContractAll').then(res => res.json())
            .then(d => d);

  }
   async getHrContractAll_count(fhevent) {
    return {"fhok":10}

  }



  async getHrContractAllView() {

    return fetch(this.baseURL()+'/hrContract/getHrContractAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateHrContractv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.HrContract.updateaHrContract
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/hrContract/updateHrContract/'+Id,
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
