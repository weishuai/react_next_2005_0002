import { BaseController } from '../utils/BaseController';
// import API from '../json/fhcrm.json';
import axios from 'axios';
export class BatchController extends BaseController {

  async createBatch(data) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/batch/createBatch',
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

  async removeBatch(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/batch/removeBatch/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getBatchById(Id:string) {
    return fetch(this.baseURL()+'/batch/getBatchById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getBatchAll(fhevent) {
    return fetch(this.baseURL()+'/batch/getBatchAll').then(res => res.json())
            .then(d => d);

  }
   async getBatchAll_count(fhevent) {
    return {"fhok":10}

  }



  async getBatchAllView() {

    return fetch(this.baseURL()+'/batch/getBatchAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateBatchv2(data:any,Id:string,userToken:string) {
//     API.fhcrm.Batch.updateaBatch
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/batch/updateBatch/'+Id,
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
