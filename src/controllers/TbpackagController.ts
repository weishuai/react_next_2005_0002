import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class TbpackagController extends BaseController {

  async createTbpackag(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/tbpackag/createTbpackag',
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

  async removeTbpackag(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/tbpackag/removeTbpackag/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getTbpackagById(Id:string) {
    return fetch(this.baseURL()+'/tbpackag/getTbpackagById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getTbpackagAll(fhevent) {
    return fetch(this.baseURL()+'/tbpackag/getTbpackagAll').then(res => res.json())
            .then(d => d);

  }
   async getTbpackagAll_count(fhevent) {
    return {"fhok":10}

  }



  async getTbpackagAllView() {

    return fetch(this.baseURL()+'/tbpackag/getTbpackagAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateTbpackagv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.Tbpackag.updateaTbpackag
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/tbpackag/updateTbpackag/'+Id,
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
