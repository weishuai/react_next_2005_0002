import React, { useEffect, useState } from 'react';
import { UserController } from '../../controllers/UserController';
export const Repeat= (props: { id: string; }) => {
  const ctlUser=new UserController();
  const [userName, setuserName] = useState(null);
  async function getFHuser()
  {
      const ctlUse=new UserController();
      console.log('props.id:' +props.id); 
      const fhojts =await  ctlUser.getFHuserById(props.id);
      ///console.log('fhojts["userName"]:' +JSON.parse(fhojts["fhok"]).userName); 
      setuserName(JSON.parse(fhojts["fhok"]).userName);
      //return JSON.parse(fhojts["fhok"]).map((d) => ({ code: d.id, name: d.userName }))
      //return {userName:fhojts["fhok"]["userName"]};
  }

  React.useEffect(() => { 
    getFHuser()
    }, [props.id]);

    // let items = [];
    // // for (let i = 0; i < props.numTimes; i++) {
    // //   items.push(props.children(i));
    // // }
    // return <div>{items}</div>;

  return <div>{userName}</div>;
  };