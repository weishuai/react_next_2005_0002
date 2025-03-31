import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { globalStorage } from '../../utils/Globalstorage';
///import {AccountTagController } from '../../controllers/AccountTagController';
export const Dashboard = () => {
/*
  const ctl=new AccountTagController();
 const fhok =ctl.getAccountTagAllView();
 const fhretrun =fhok["AccountTag"];
 console.log('fhretrun:' +fhretrun);
 */

 const userID=globalStorage.get("userID");
 console.log('userID'+userID);



  return (
    <div className="p-grid dashboard">
   <table width='100%'>
   <thead>
   </thead>
    <tbody>
    <tr>
       <td>
       <div className="p-col-12 p-md-3">
        <div className="overview-box overview-box-1">
          <div className="overview-box-header"></div>
          <div className="overview-box-content">
            <div className="overview-box-icon">
              <i className="pi pi-envelope"></i>
            </div>
            <div className="overview-box-title">Messages</div>
            <div className="overview-box-count">152</div>
          </div>
        </div>
      </div>              
       </td> 
       <td>
       <div className="p-col-12 p-md-3">
        <div className="overview-box overview-box-2">
          <div className="overview-box-header"></div>
          <div className="overview-box-content">
            <div className="overview-box-icon">
              <i className="pi pi-map-marker"></i>
            </div>
            <div className="overview-box-title">Check-Ins</div>
            <div className="overview-box-count">532</div>
          </div>
        </div>
      </div>          
        </td> 
       <td>
       <div className="p-col-12 p-md-3">
        <div className="overview-box overview-box-3">
          <div className="overview-box-header"></div>
          <div className="overview-box-content">
            <div className="overview-box-icon">
              <i className="pi pi-file"></i>
            </div>
            <div className="overview-box-title">Files Sycned</div>
            <div className="overview-box-count">28</div>
          </div>
        </div>
      </div>          
       </td> 
       <td>
       <div className="p-col-12 p-md-3">
        <div className="overview-box overview-box-4">
          <div className="overview-box-header"></div>
          <div className="overview-box-content">
            <div className="overview-box-icon">
              <i className="pi pi-users"></i>
            </div>
            <div className="overview-box-title">Users Online</div>
            <div className="overview-box-count">256</div>
          </div>
        </div>
      </div>          
      </td> 
    </tr>
    </tbody>   
</table>
<table  width='100%'>
    <tbody>
        <tr>
        <td width='30%'>
        <div className="p-col-12 p-lg-4">
        <div className="task-box task-box-1">
          <div className="task-box-header">
            <i className="pi pi-refresh"></i>
          </div>
          <div className="task-box-content">
            <h3>Client Meeting</h3>
            <p>Annual reports per branch</p>
          </div>
          <div className="task-box-footer">
            <span className="task-status">WAITING</span>
          </div>
        </div>
      </div>           
        </td>
        <td width='40%'>
        <div className="p-col-12 p-lg-6">
        <div className="task-box task-box-2">
          <div className="task-box-header">
            <i className="pi pi-refresh"></i>
          </div>
          <div className="task-box-content">
            <h3>Sale Reports</h3>
            <p>Annual reports per branch</p>
          </div>
          <div className="task-box-footer">
            <span className="task-status">IN PROGRESS</span>
          </div>
        </div>
      </div>
        </td>
        <td width='30%'>
        <div className="p-col-12 p-lg-4">
        <div className="task-box task-box-3">
          <div className="task-box-header">
            <i className="pi pi-refresh"></i>
          </div>
          <div className="task-box-content">
            <h3>Marketing Meeting</h3>
            <p>Marketing meeting to review sales.</p>
          </div>
          <div className="task-box-footer">
            <span className="task-status">ON HOLD</span>
          </div>
        </div>
      </div>           
        </td>       
        </tr>
    </tbody>
</table>
    </div>
  );
};
