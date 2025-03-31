import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class TicketController extends BaseController {

  async createTicket(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/Ticket/createTicket',
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

  async removeTicket(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/Ticket/removeTicket/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getTicketById(Id:string) {
    return fetch(this.baseURL()+'/Ticket/getTicketById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getTicketAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/Ticket/getTicketAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getTicketAllView() {

    return fetch(this.baseURL()+'/Ticket/getTicketAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateTicketv2(data:any,Id:string,userToken:string) {
    //API.fhcrm.Ticket.updateaTicket
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/Ticket/updateTicket/'+Id,
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
