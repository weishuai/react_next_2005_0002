"use client"
import React from 'react';
import { useTranslation } from 'react-i18next'
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

    <div>
    <iframe
        src="http://127.0.0.1:8069/web#cids=1&action=menu"
        title="Example Iframe"
        width="1000"
        height="800"
        allowFullScreen
    ></iframe>
   </div>

  );
}