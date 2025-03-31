import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class FHcrmTable1Controller extends BaseController {



  async createFHcrmTable1(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/FHcrmTable1/createFHcrmTable1',
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

  async removeFHcrmTable1(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/FHcrmTable1/removeFHcrmTable1/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }

  async getFHcrmTable1ById(Id:string) {
    return fetch(this.baseURL()+'/FHcrmTable1/getFHcrmTable1ById/'+Id).then(res =>res.json())
            .then(d => d);

  }

/**
  async getFHcrmTable1ById(Id:string) {
    ////API.fhcrm.FHcrmTable1.updateaFHcrmTable1
    console.info("Id:"+Id);
    let responseData={};
    await axios({
         method:'get',
         url:this.baseURL()+'/FHcrmTable1/getFHcrmTable1ById/'+Id,
         params:{Id:Id},
       }).then(function (response) {
           console.log('response:'+JSON.stringify(response.data));
           responseData=response.data;
         })
         .catch(function (error) {
           responseData={};
         });
         return {fhok:responseData};
  }
 */




  async getFHcrmTable1All(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/FHcrmTable1/getFHcrmTable1All?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getFHcrmTable1AllView() {

    return fetch(this.baseURL()+'/FHcrmTable1/getFHcrmTable1AllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateFHcrmTable1v2(data:any,Id:string,userToken:string) {
    ////API.fhcrm.FHcrmTable1.updateaFHcrmTable1
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/FHcrmTable1/updateFHcrmTable1/'+Id,
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
