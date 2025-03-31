import { BaseController } from '../utils/BaseController';
//import API from '../json/fhcrm.json';
import axios from 'axios';
import { AccountTagVo } from '../stores/AccountTag';
export class DatetiemController extends BaseController {

   getListDate(datime:any) {

    const mydata= new Date(datime);
    const myHours=mydata.getHours();
    if(myHours>16)
    {
      mydata.setHours(mydata.getDate() + 1);
    }
    let fhstarts=mydata.toLocaleString('en',{ hour12: false });
    //console.log('fhstarts.length:'+fhstarts.length.toString());
    fhstarts=fhstarts.substring(0,fhstarts.length-10);
    //console.log('fhstarts:'+fhstarts);
    return fhstarts;

    }

    getListDatetime(datime: string | number | Date) {

        const updatedAt=new Date(datime);
        updatedAt.setHours(updatedAt.getHours() + 8);
        const fhupdatedAt=updatedAt.toLocaleString();
        return fhupdatedAt;
    
        }


    getItemDatetime(datime:any) {
          const updatedAt=new Date(datime);
          updatedAt.setHours(updatedAt.getHours() + 8);
          return updatedAt;
      
          }
  

    getItemDate(datime:any) {

      const mydata= new Date(datime);
      const myHours=mydata.getHours();
      if(myHours>16)
      {
        mydata.setHours(mydata.getDate() + 1);
      }
  
        return mydata;
  
      }
    setItemDate() {
      const fhnew=new Date();
      fhnew.setHours(fhnew.getHours()-8);
      //console.log('fhnew:'+fhnew.toString());
      return fhnew;
      }

    setItemDatetime(datime: string | number | Date) {

      const mydata= new Date(datime);
      const myHours=mydata.getHours();
      if(myHours>16)
      {
        mydata.setHours(mydata.getDate() - 1);
      }
      return mydata;
      }
}
