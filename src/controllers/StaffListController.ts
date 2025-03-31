import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class StaffListController extends BaseController {

  async createStaffList(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/staffList/createStaffList',
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

  async removeStaffList(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/staffList/removeStaffList/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getStaffListById(Id:string) {
    return fetch(this.baseURL()+'/staffList/getStaffListById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getStaffListAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/staffList/getStaffListAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getStaffListAllView() {

    return fetch(this.baseURL()+'/staffList/getStaffListAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateStaffListv2(data:any,Id:string,userToken:string) {
    //API.fhcrm.StaffList.updateaStaffList
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/staffList/updateStaffList/'+Id,
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
