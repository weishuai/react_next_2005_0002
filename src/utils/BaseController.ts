
import _ from 'lodash';
import { useState } from 'react';
import axios from 'axios';



export class BaseController {
  
  baseURL(){
    return "http://127.0.0.1:3009";

  };

  baseOdooURL(){
    return "http://127.0.0.1:8069";

  };  
  success(message: string, param?: any) {
    ///ToastHandler.success(message, param);
  }

  error(message: string, param?: any) {
    ///ToastHandler.error(message, param);
  }

  info(message: string, param?: any) {
   /// ToastHandler.info(message, param);
  }

  warning(message: string, param?: any) {
    ///ToastHandler.warning(message, param);
  }
}
