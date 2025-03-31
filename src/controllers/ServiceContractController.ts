import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class ServiceContractController extends BaseController {

  async createServiceContract(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/ServiceContract/createServiceContract',
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

  async removeServiceContract(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/ServiceContract/removeServiceContract/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getServiceContractById(Id:string) {
    return fetch(this.baseURL()+'/ServiceContract/getServiceContractById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getServiceContractAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/ServiceContract/getServiceContractAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getServiceContractAllView() {

    return fetch(this.baseURL()+'/ServiceContract/getServiceContractAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateServiceContractv2(data:any,Id:string,userToken:string) {
    //API.fhcrm.ServiceContract.updateaServiceContract
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/ServiceContract/updateServiceContract/'+Id,
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
