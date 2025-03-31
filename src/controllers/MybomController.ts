import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class MybomController extends BaseController {

  async createMybom(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/mybom/createMybom',
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

  async removeMybom(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/mybom/removeMybom/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getMybomById(Id:string) {
    return fetch(this.baseURL()+'/mybom/getMybomById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getMybomAll(fhevent) {
    return fetch(this.baseURL()+'/mybom/getMybomAll').then(res => res.json())
            .then(d => d);

  }
   async getMybomAll_count(fhevent) {
    return {"fhok":10}

  }



  async getMybomAllView() {

    return fetch(this.baseURL()+'/mybom/getMybomAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateMybomv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.Mybom.updateaMybom
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/mybom/updateMybom/'+Id,
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
