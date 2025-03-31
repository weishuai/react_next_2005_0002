import _ from 'lodash';
import { useState } from 'react';
export class UserVo {
  id?:string;
  email?:string;
  userName?:string;
  app?:string;
  timezone?:string;
  mobileCountryCode?:string;
  mobileCallingCountryCode?:string;
  mobileNumber?:string;
  avatar?:string;
  isLocked?:number;
  createdAt?:Date;
  lastSignIn?:Date;
  hasPassword?:boolean;
}
export class SignInStore {
  email?:string;
  password? :string;
  rememberMe?:boolean;
  captcha?:string;
}