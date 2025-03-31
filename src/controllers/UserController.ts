import { BaseController } from '../utils/BaseController';
import { parseParams } from '../utils/parseParams';
import axios from 'axios';
//import API from '../json/fhcrm.json';
import { SignInStore } from '../stores/User';
export class UserController extends BaseController{

// async longin(name:string,password:string) {
//   let responseData="";
//    await axios({
//         baseURL:this.baseOdooURL(),
//         method:'post',
//         url:'/Account/Accountlogin',
//         headers:{'content-type':'application/x-www-form-urlencoded'},
//         data : {
//           name :name,
//           password:password,
//         }}).then(function (response) {
//           //console.log('response:'+JSON.stringify(response.data));
//           responseData=response.data;
//         })
//         .catch(function (error) {
//           responseData="no";
//         });
//         return {fhok:responseData};
// }
async longin(name:string,password:string) {
  let responseData="";
   await axios({
        baseURL:this.baseOdooURL(),
        method:'post',
        url:'/FHUser/FHUserLog',
        headers:{'content-type':'application/x-www-form-urlencoded'},
        data : {
          login:name,
          password:password
        }}).then(function (response) {
          //console.log('response:'+JSON.stringify(response.data));
          responseData=JSON.stringify(response.data);
        })
        .catch(function (error) {
          responseData="no";
        });
        return {fhok:responseData};
}
async getFHUserAll() {
  let responseData="";
   await axios({
        baseURL:this.baseURL(),
        method:'get',
        url:'FHUser/getFHUserAll',
        headers:{'content-type':'application/json'},
        data : {
        }}).then(function (response) {
          responseData=JSON.stringify(response.data);
        })
        .catch(function (error) {
          responseData=error;
        });
        return {fhok:responseData};
}
/*
async getFHuserById(Id:string) {
  return fetch(this.baseURL()+'/FHUser/getFHUserById/'+Id).then(res => res.json())
          .then(d => d);

}
*/

async getFHuserById(Id:string) {
  let responseData="";
   await axios({
        baseURL:this.baseURL(),
        method:'get',
        url:'/FHUser/getFHUserById/'+Id,
        headers:{'content-type':'application/json'},
        data : {
        }}).then(function (response) {
          console.log('response:'+JSON.stringify(response.data));
          responseData=JSON.stringify(response.data);
        })
        .catch(function (error) {
          responseData="no";
        });
        return {fhok:responseData};
}

async createUser(data:any) {
  let responseData="";
   await axios({
        baseURL:this.baseURL(),
        method:'post',
        url:'/User/createUser',
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

async removeUser(Ids: string[]) {
const numbers = Ids;
const listItems = numbers.map((id) => {
  return fetch(this.baseURL()+'/User/removeUser/'+id).then(res => res.json())
  .then(d => d);
});
///this.success();
}


async getUserById(Id:string) {
return fetch(this.baseURL()+'/User/getUserById/'+Id).then(res => res.json())
        .then(d => d);

}

async getUserAll(fhevent:any) {
  const fhurl=parseParams.setparseParams({
    'pageIndex':fhevent.page+1,
    'recordIndex':fhevent.first,
    'pageSize':fhevent.rows,
    'search':fhevent.search,
    'sort':fhevent.sort,
})
console.log('fhurl:'+fhurl);
return fetch(this.baseURL()+'/FHUser/getFHUserAll002').then(res => res.json())
        .then(d => d);

}


async getUserAllView() {

return fetch(this.baseURL()+'/User/getUserAllViewOK').then(res => res.json())
        .then(d => d);
}

async updateUserv2(data:any,Id:string,userToken:string) {
let responseData="";
await axios({
     baseURL:this.baseURL(),
     method:'put',
     url:'/User/updateUser/'+Id,
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