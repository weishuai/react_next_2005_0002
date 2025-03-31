"use client";
import React from 'react';
import { useTranslation } from 'react-i18next'

import  VerticalScrollDemo from '../../../src/views/VerticalScrollDemo/VerticalScrollList';
export default function Page() {
  const { t, i18n } = useTranslation();
  
  return (

    // <div>ok</div>
      <VerticalScrollDemo />
  
  );
}