import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class TbreturnvisitController extends BaseController {

  async createTbreturnvisit(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/tbreturnvisit/createTbreturnvisit',
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

  async removeTbreturnvisit(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/tbreturnvisit/removeTbreturnvisit/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getTbreturnvisitById(Id:string) {
    return fetch(this.baseURL()+'/tbreturnvisit/getTbreturnvisitById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getTbreturnvisitAll(fhevent) {
    return fetch(this.baseURL()+'/tbreturnvisit/getTbreturnvisitAll').then(res => res.json())
            .then(d => d);

  }
   async getTbreturnvisitAll_count(fhevent) {
    return {"fhok":10}

  }



  async getTbreturnvisitAllView() {

    return fetch(this.baseURL()+'/tbreturnvisit/getTbreturnvisitAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateTbreturnvisitv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.Tbreturnvisit.updateaTbreturnvisit
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/tbreturnvisit/updateTbreturnvisit/'+Id,
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
