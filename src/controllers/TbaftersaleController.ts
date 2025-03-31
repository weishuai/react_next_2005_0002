import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class TbaftersaleController extends BaseController {

  async createTbaftersale(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/tbaftersale/createTbaftersale',
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

  async removeTbaftersale(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/tbaftersale/removeTbaftersale/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getTbaftersaleById(Id:string) {
    return fetch(this.baseURL()+'/tbaftersale/getTbaftersaleById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getTbaftersaleAll(fhevent) {
    return fetch(this.baseURL()+'/tbaftersale/getTbaftersaleAll').then(res => res.json())
            .then(d => d);

  }
   async getTbaftersaleAll_count(fhevent) {
    return {"fhok":10}

  }



  async getTbaftersaleAllView() {

    return fetch(this.baseURL()+'/tbaftersale/getTbaftersaleAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateTbaftersalev2(data:any,Id:string,userToken:string) {
//     API.fhcrm.Tbaftersale.updateaTbaftersale
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/tbaftersale/updateTbaftersale/'+Id,
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
