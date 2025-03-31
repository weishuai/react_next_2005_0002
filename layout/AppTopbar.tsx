/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useRouter } from "next/navigation";
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { AppTopbarRef } from '../types/types';
import { LayoutContext } from './context/layoutcontext';
import { globalStorage } from '../src/utils/Globalstorage';
const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const { push,replace } = useRouter(); 
    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));
    const load = () => {
        const uid=globalStorage.set("userID",null)
        push('/auth/login');
    };
    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">

                <img src="/layout/images/WechatIMG11.jpg"  height={'60px'} alt="logo" />
                <span>myERP</span>

            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </button>
               
                <button type="button"  onClick={load} className="p-link layout-topbar-button">
                    <i className="pi pi-cog"></i>
                    <span>登出</span>
                </button>
                
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
