import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
//import API from '../json/fhcrm.json';
import axios from 'axios';
export class FeedbackController extends BaseController {

  async createFeedback(data:any) {
      let responseData="";
       await axios({
            baseURL:this.baseURL(),
            method:'post',
            url:'/Feedback/createFeedback',
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

  async removeFeedback(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      return fetch(this.baseURL()+'/Feedback/removeFeedback/'+id).then(res => res.json())
      .then(d => d);
    });
    ///this.success();
  }


  async getFeedbackById(Id:string) {
    return fetch(this.baseURL()+'/Feedback/getFeedbackById/'+Id).then(res => res.json())
            .then(d => d);

  }

  async getFeedbackAll(fhevent:any) {
    const fhurl=parseParams.setparseParams({
      'pageIndex':fhevent.page+1,
      'recordIndex':fhevent.first,
      'pageSize':fhevent.rows,
      'search':fhevent.search,
      'sort':fhevent.sort,
  })
    return fetch(this.baseURL()+'/Feedback/getFeedbackAll?'+fhurl).then(res => res.json())
            .then(d => d);

  }


  async getFeedbackAllView() {

    return fetch(this.baseURL()+'/Feedback/getFeedbackAllViewOK').then(res => res.json())
            .then(d => d);
  }

  async updateFeedbackv2(data:any,Id:string,userToken:string) {
    //API.fhcrm.Feedback.updateaFeedback
    let responseData="";
    await axios({
         baseURL:this.baseURL(),
         method:'put',
         url:'/Feedback/updateFeedback/'+Id,
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
