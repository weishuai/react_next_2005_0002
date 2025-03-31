/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            {/* <img src="/layout/images/WechatIMG13.jpg" alt="Logo" height="20" className="mr-2" /> */}
            
            <span className="font-medium ml-2">myERP@苏州丰禾</span>
        </div>
    );
};

export default AppFooter;
