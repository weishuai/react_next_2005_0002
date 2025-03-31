import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class ClientController extends BaseController {

  async createClient(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/Client/createClient',
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

  async removeClient(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/Client/removeClient/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getClientById(Id:string) {
    return fetch(this.baseURL()+'/Client/getClientById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getClientAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/Client/getClientAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getClientAllView() {

    return fetch(this.baseURL()+'/Client/getClientAllView').then(res => res.json())
            .then(d => d);
  }

  async updateClientv2(data:any,Id:string,userToken:string) {
    console.info("客户端:");
    console.info(JSON.stringify(data));
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/Client/updateClient/'+Id,
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
